import fs from "fs/promises";
import path from "path";
import { storage } from "../storage";
import type {
  InsertGraphPermissionEndpoint,
} from "@shared/schema";

const PERMISSIONS_DIR = path.resolve(
  process.cwd(),
  "docs/api-permissions/permissions",
);
const PERMISSIONS_INDEX = path.join(PERMISSIONS_DIR, "README.md");
const ENDPOINT_REFERENCE = path.resolve(
  process.cwd(),
  "docs/api-permissions/reference/api-endpoints.md",
);

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

interface ParsedPermission {
  name: string;
  displayName?: string;
  permissionId: string;
  type?: string;
  scope?: string;
  adminConsentRequired?: boolean;
  riskLevel?: string;
  riskLabel?: string;
  description?: string;
  useCases: string[];
  requiredActions: string[];
  assignedDate?: Date;
  endpoints: InsertGraphPermissionEndpoint[];
  docPath: string;
  metadata?: Record<string, unknown>;
}

interface IngestionStats {
  permissionsProcessed: number;
  endpointsProcessed: number;
  categoriesCreated: number;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

function extractLineValue(content: string, label: string): string | undefined {
  const regex = new RegExp(`\\*\\*${label}\\*\\*:\\s*(.+)`, "i");
  const match = content.match(regex);
  return match ? match[1].trim() : undefined;
}

function extractSection(
  content: string,
  heading: string,
  level: "##" | "###" = "##",
): string | undefined {
  const pattern = new RegExp(
    `${level}\\s+${heading}\\s*\\n([\\s\\S]*?)(?=\\n#{2,}\\s+|$)`,
    "i",
  );
  const match = content.match(pattern);
  return match ? match[1].trim() : undefined;
}

function parseRisk(section?: string): { riskLevel?: string; riskLabel?: string } {
  if (!section) return {};
  const labelMatch = section.match(/\*\*(.+?)\*\*/);
  const riskLabel = labelMatch ? labelMatch[1].toUpperCase() : undefined;
  const riskLevel = section.includes("🔴")
    ? "high"
    : section.includes("🟡")
      ? "medium"
      : section.includes("🟢")
        ? "low"
        : undefined;
  return { riskLevel, riskLabel };
}

function parseUseCases(section?: string): string[] {
  if (!section) return [];
  return section
    .split(/\n/) // split lines
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter((line) => line.length > 0 && !line.toLowerCase().startsWith("this permission"));
}

function parseRequiredActions(section?: string): string[] {
  if (!section) return [];
  return section
    .split(/\n/)
    .map((line) => line.replace(/^[-*]\s*\[?x?\]?\s*/i, "").trim())
    .filter((line) => line.length > 0);
}

function parseAssignedDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value.replace(/`/g, ""));
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function extractEndpointsFromPermissionDoc(
  content: string,
  permissionId: string,
): InsertGraphPermissionEndpoint[] {
  const endpoints: InsertGraphPermissionEndpoint[] = [];
  const codeBlocks = content.matchAll(/```http\s*([A-Z]+)\s+([^\s\n]+)[\s\S]*?```/g);
  for (const block of Array.from(codeBlocks)) {
    const method = block[1];
    const path = block[2];
    if (HTTP_METHODS.includes(method)) {
      endpoints.push({
        permissionId,
        method,
        path,
        source: "permission-doc",
      });
    }
  }

  const inlineEndpoints = content.matchAll(/[-*]\s*`(GET|POST|PUT|PATCH|DELETE)\s+([^`]+)`/g);
  for (const match of Array.from(inlineEndpoints)) {
    const method = match[1];
    const path = match[2];
    endpoints.push({
      permissionId,
      method,
      path,
      source: "permission-doc",
    });
  }

  return endpoints;
}

async function buildCategoryMap(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  try {
    const content = await fs.readFile(PERMISSIONS_INDEX, "utf8");
    const categoryBlocks = content.matchAll(/####\s+(.+?)\s+\(\d+ permissions?\)\n\n([\s\S]*?)(?=####|$)/g);
    for (const block of Array.from(categoryBlocks)) {
      const categoryName = block[1].trim();
      const entries = block[2].matchAll(/\[(.+?)\]\(\.\/.+?\)/g);
      for (const entry of Array.from(entries)) {
        const permissionName = entry[1].trim();
        map.set(permissionName, categoryName);
      }
    }
  } catch (error) {
    console.warn("[permission-ingestion] Unable to parse category index", error);
  }
  return map;
}

async function parsePermissionFile(
  filePath: string,
  categoryMap: Map<string, string>,
): Promise<ParsedPermission | null> {
  const content = await fs.readFile(filePath, "utf8");
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const name = titleMatch ? titleMatch[1].trim() : undefined;
  const permissionId = extractLineValue(content, "Permission ID")?.replace(/`/g, "");
  if (!name || !permissionId) {
    return null;
  }

  const displayName = extractLineValue(content, "Display Name") || name;
  const type = extractLineValue(content, "Type");
  const scope = extractLineValue(content, "Scope");
  const adminConsentRequired = extractLineValue(
    content,
    "Admin Consent Required",
  )?.toLowerCase() === "yes";
  const descriptionSection = extractSection(content, "Description")?.replace(
    /\n+/g,
    " ",
  );
  const useCases = parseUseCases(extractSection(content, "Use Cases"));
  const requiredActions = parseRequiredActions(extractSection(content, "Required Actions", "###"));
  const riskSection = extractSection(content, "Risk Level", "###");
  const { riskLevel, riskLabel } = parseRisk(riskSection);
  const assignedDate = parseAssignedDate(extractLineValue(content, "Assigned Date"));
  const endpoints = extractEndpointsFromPermissionDoc(content, permissionId);
  const categoryName = categoryMap.get(name);

  const permission: ParsedPermission = {
    name,
    displayName,
    permissionId,
    type,
    scope,
    adminConsentRequired,
    riskLevel,
    riskLabel,
    description: descriptionSection,
    useCases,
    requiredActions,
    assignedDate,
    endpoints,
    docPath: path.relative(process.cwd(), filePath),
    metadata: {
      categoryName,
    },
  };

  return permission;
}

function extractEndpointsFromReference(
  content: string,
  permissionLookup: Map<string, string>,
): InsertGraphPermissionEndpoint[] {
  const endpoints: InsertGraphPermissionEndpoint[] = [];
  const httpBlocks = content.matchAll(/```http\s*([A-Z]+)\s+([^\s\n]+)[\s\S]*?```[\s\S]*?\*\*Required Permission\*\*:\s*`([^`]+)`/g);
  for (const block of Array.from(httpBlocks)) {
    const method = block[1];
    const pathValue = block[2];
    const permissionsLine = block[3];
    const permissionNames = permissionsLine
      .split(/\s+or\s+/i)
      .map((name: string) => name.trim())
      .filter(Boolean);

    for (const permissionName of permissionNames) {
      const permissionId = permissionLookup.get(permissionName);
      if (!permissionId) continue;
      endpoints.push({
        permissionId,
        method,
        path: pathValue,
        source: "reference/api-endpoints",
      });
    }
  }
  return endpoints;
}

export async function ingestGraphPermissionsFromDocs(): Promise<IngestionStats> {
  const categoryMap = await buildCategoryMap();
  const files = await fs.readdir(PERMISSIONS_DIR);
  let permissionsProcessed = 0;
  let endpointsProcessed = 0;
  const categoryCache = new Map<string, string>();
  const permissionLookup = new Map<string, string>();

  for (const file of files) {
    if (!file.endsWith(".md") || file.toLowerCase() === "readme.md") continue;
    const filePath = path.join(PERMISSIONS_DIR, file);
    const parsed = await parsePermissionFile(filePath, categoryMap);
    if (!parsed) continue;

    let categoryId: string | undefined;
    const categoryName = categoryMap.get(parsed.name);
    if (categoryName) {
      const slug = slugify(categoryName);
      if (!categoryCache.has(slug)) {
        const category = await storage.upsertGraphPermissionCategory({
          name: categoryName,
          slug,
          sourcePath: path.relative(process.cwd(), PERMISSIONS_INDEX),
        });
        categoryCache.set(slug, category.id);
      }
      categoryId = categoryCache.get(slug);
    }

    const permissionRecord = await storage.upsertGraphPermission({
      name: parsed.name,
      displayName: parsed.displayName,
      permissionId: parsed.permissionId,
      type: parsed.type,
      scope: parsed.scope,
      adminConsentRequired: parsed.adminConsentRequired,
      riskLevel: parsed.riskLevel,
      riskLabel: parsed.riskLabel,
      description: parsed.description,
      categoryId,
      assignedDate: parsed.assignedDate,
      docPath: parsed.docPath,
      useCases: parsed.useCases,
      requiredActions: parsed.requiredActions,
      metadata: parsed.metadata,
    });

    permissionLookup.set(parsed.name, permissionRecord.id);
    permissionsProcessed += 1;

    await storage.deleteGraphPermissionEndpoints(permissionRecord.id, "permission-doc");
    for (const endpoint of parsed.endpoints) {
      await storage.upsertGraphPermissionEndpoint({
        ...endpoint,
        permissionId: permissionRecord.id,
      });
      endpointsProcessed += 1;
    }
  }

  try {
    const referenceContent = await fs.readFile(ENDPOINT_REFERENCE, "utf8");
    const referenceEndpoints = extractEndpointsFromReference(
      referenceContent,
      permissionLookup,
    );

    for (const endpoint of referenceEndpoints) {
      await storage.upsertGraphPermissionEndpoint(endpoint);
      endpointsProcessed += 1;
    }
  } catch (error) {
    console.warn("[permission-ingestion] Unable to parse endpoint reference", error);
  }

  return {
    permissionsProcessed,
    endpointsProcessed,
    categoriesCreated: categoryCache.size,
  };
}

if (process.argv[1]?.includes("permissionIngestion")) {
  ingestGraphPermissionsFromDocs()
    .then((stats) => {
      console.log(
        `Permission ingestion complete: ${stats.permissionsProcessed} permissions, ${stats.endpointsProcessed} endpoints, ${stats.categoriesCreated} categories`,
      );
      process.exit(0);
    })
    .catch((error) => {
      console.error("Permission ingestion failed", error);
      process.exit(1);
    });
}
