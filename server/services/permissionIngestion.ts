import fs from "fs/promises";
import path from "path";
import {
  InsertGraphPermissionEndpoint,
  InsertGraphPermissionExample,
} from "@shared/schema";
import { storage } from "../storage";

interface ParsedPermissionDoc {
  name: string;
  displayName?: string;
  permissionId?: string;
  type?: string;
  scope?: string;
  adminConsentRequired?: boolean;
  assignedDate?: Date;
  description?: string;
  riskLevel?: string;
  endpoints: InsertGraphPermissionEndpoint[];
  examples: InsertGraphPermissionExample[];
}

interface CategoryIndex {
  categories: Set<string>;
  permissionCategoryMap: Map<string, string>;
}

function extractValue(label: string, content: string): string | undefined {
  const regex = new RegExp(`\\*\\*${label}\\*\\*:\\s*([^\\n]+)`, "i");
  const match = content.match(regex);
  return match ? match[1].replace(/`/g, "").trim() : undefined;
}

function extractSection(content: string, heading: string): string | undefined {
  const regex = new RegExp(`## ${heading}\\s*\\n([\\s\\S]*?)(\\n## |$)`, "i");
  const match = content.match(regex);
  return match ? match[1].trim() : undefined;
}

function parseApiEndpoints(section?: string): InsertGraphPermissionEndpoint[] {
  if (!section) return [];

  const endpoints: InsertGraphPermissionEndpoint[] = [];
  const lines = section.split(/\r?\n/).map((line) => line.trim());
  for (const line of lines) {
    if (!line.startsWith("-")) continue;
    const match = line.match(/-\s*(GET|POST|PUT|PATCH|DELETE)?[:\s-]*([^\s]+)?/i);
    if (match && match[2]) {
      endpoints.push({
        method: match[1]?.toUpperCase(),
        path: match[2],
      });
    }
  }

  return endpoints;
}

function parseExamples(content: string): InsertGraphPermissionExample[] {
  const regex = /```(\w+)\n([\s\S]*?)```/g;
  const examples: InsertGraphPermissionExample[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content))) {
    examples.push({ language: match[1], code: match[2].trim() });
  }

  return examples;
}

function parsePermissionDocument(content: string): ParsedPermissionDoc {
  const nameMatch = content.match(/^#\s+(.+)$/m);
  const name = nameMatch ? nameMatch[1].trim() : "Unknown";

  const displayName = extractValue("Display Name", content);
  const permissionId = extractValue("Permission ID", content);
  const type = extractValue("Type", content);
  const scope = extractValue("Scope", content);
  const adminConsent = extractValue("Admin Consent Required", content);
  const assignedDateRaw = extractValue("Assigned Date", content);
  const riskLevelMatch = content.match(/\*\*(HIGH|MEDIUM|LOW)\*\*/i);
  const descriptionSection = extractSection(content, "Description");
  const apiEndpointsSection = extractSection(content, "API Endpoints");

  const description = descriptionSection
    ?.split(/\n\n/)
    .map((p) => p.trim())
    .filter(Boolean)[0];

  return {
    name,
    displayName,
    permissionId,
    type,
    scope,
    adminConsentRequired: adminConsent?.toLowerCase().includes("yes"),
    assignedDate: assignedDateRaw ? new Date(assignedDateRaw) : undefined,
    description,
    riskLevel: riskLevelMatch ? riskLevelMatch[1].toUpperCase() : undefined,
    endpoints: parseApiEndpoints(apiEndpointsSection),
    examples: parseExamples(content),
  };
}

async function parseCategoryIndex(indexPath: string): Promise<CategoryIndex> {
  const content = await fs.readFile(indexPath, "utf-8");
  const lines = content.split(/\r?\n/);

  const categories = new Set<string>();
  const permissionCategoryMap = new Map<string, string>();
  let currentCategory: string | null = null;

  for (const line of lines) {
    const categoryMatch = line.match(/^####\s+(.+?)\s+\(/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1].trim();
      categories.add(currentCategory);
      continue;
    }

    const permissionMatch = line.match(/^- \[(.+?)\]\(\.\/(.+?)\)/);
    if (permissionMatch && currentCategory) {
      const filename = permissionMatch[2];
      permissionCategoryMap.set(filename, currentCategory);
    }
  }

  return { categories, permissionCategoryMap };
}

export interface PermissionIngestionStats {
  categoriesUpserted: number;
  permissionsProcessed: number;
  endpointsProcessed: number;
  examplesProcessed: number;
}

export async function ingestGraphPermissionDocs(
  rootDir = path.resolve(process.cwd(), "docs/api-permissions"),
): Promise<PermissionIngestionStats> {
  const permissionsDir = path.join(rootDir, "permissions");
  const indexPath = path.join(permissionsDir, "README.md");

  const { categories, permissionCategoryMap } = await parseCategoryIndex(indexPath);

  // Ensure we have a fallback category for unlisted permissions
  categories.add("Uncategorized");

  const categoryIdMap = new Map<string, string>();
  let categoriesUpserted = 0;
  for (const categoryName of Array.from(categories)) {
    const category = await storage.upsertPermissionCategory({ name: categoryName });
    categoryIdMap.set(categoryName, category.id);
    categoriesUpserted++;
  }

  const files = await fs.readdir(permissionsDir);
  let permissionsProcessed = 0;
  let endpointsProcessed = 0;
  let examplesProcessed = 0;

  for (const file of files) {
    if (!file.endsWith(".md") || file.toLowerCase() === "readme.md") continue;

    const content = await fs.readFile(path.join(permissionsDir, file), "utf-8");
    const parsed = parsePermissionDocument(content);

    const categoryName = permissionCategoryMap.get(file) || "Uncategorized";
    const categoryId = categoryIdMap.get(categoryName);

    const permission = await storage.upsertGraphPermission({
      ...parsed,
      categoryId,
    });

    const endpoints = await storage.replaceGraphPermissionEndpoints(
      permission.id,
      parsed.endpoints,
    );
    const examples = await storage.replaceGraphPermissionExamples(
      permission.id,
      parsed.examples,
    );

    permissionsProcessed++;
    endpointsProcessed += endpoints.length;
    examplesProcessed += examples.length;
  }

  return { categoriesUpserted, permissionsProcessed, endpointsProcessed, examplesProcessed };
}
