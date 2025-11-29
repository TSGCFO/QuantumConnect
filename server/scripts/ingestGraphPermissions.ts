import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../db";
import {
  graphPermissions,
  type InsertGraphPermission,
} from "@shared/schema";
import { count } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PERMISSIONS_DIR = path.resolve(
  __dirname,
  "../../docs/api-permissions/permissions",
);

interface ParsedPermission {
  name: string;
  displayName?: string;
  permissionId?: string;
  type?: string;
  scope?: string;
  adminConsentRequired: boolean;
  assignedDate?: Date;
  description?: string;
  riskLevel?: string;
  useCases: string[];
  sourceFile: string;
}

function extractField(content: string, label: string): string | undefined {
  const regex = new RegExp(`\\*\\*${label}\\*\\*:\\s*(.+)`, "i");
  const match = content.match(regex);
  return match?.[1]?.trim();
}

function extractSection(content: string, heading: string): string | undefined {
  const pattern = new RegExp(`^## ${heading}\\s*\\n([\\s\\S]*?)(^## |\n$)`, "m");
  const match = content.match(pattern);
  return match?.[1]?.trim();
}

function extractRiskLevel(content: string): string | undefined {
  const sectionPattern = /### Risk Level[\s\S]*?\n([^\n]+)/m;
  const match = content.match(sectionPattern);
  if (!match?.[1]) return undefined;
  return match[1].replace(/[⚪🟢🟡🟠🔴]/g, "").replace(/\*\*/g, "").trim();
}

function parseAssignedDate(raw?: string): Date | undefined {
  if (!raw) return undefined;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function extractUseCases(content: string): string[] {
  const section = extractSection(content, "Use Cases");
  if (!section) return [];
  return section
    .split("\n")
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter((line) => line.length > 0);
}

function extractDescription(content: string): string | undefined {
  const section = extractSection(content, "Description");
  return section ? section.replace(/\n+/g, "\n").trim() : undefined;
}

function parsePermission(content: string, sourceFile: string): ParsedPermission {
  const titleMatch = content.match(/^#\s+(.+)/m);
  const name = titleMatch?.[1]?.trim();
  if (!name) {
    throw new Error(`Unable to determine permission name for ${sourceFile}`);
  }

  const adminConsentRaw = extractField(content, "Admin Consent Required");
  const assignedDateRaw = extractField(content, "Assigned Date");

  return {
    name,
    displayName: extractField(content, "Display Name"),
    permissionId: extractField(content, "Permission ID")?.replace(/`/g, ""),
    type: extractField(content, "Type"),
    scope: extractField(content, "Scope"),
    adminConsentRequired: /yes/i.test(adminConsentRaw || ""),
    assignedDate: parseAssignedDate(assignedDateRaw),
    description: extractDescription(content),
    riskLevel: extractRiskLevel(content),
    useCases: extractUseCases(content),
    sourceFile,
  };
}

async function upsertPermission(permission: ParsedPermission): Promise<void> {
  const insertable: InsertGraphPermission = {
    name: permission.name,
    displayName: permission.displayName,
    permissionId: permission.permissionId,
    type: permission.type,
    scope: permission.scope,
    adminConsentRequired: permission.adminConsentRequired,
    assignedDate: permission.assignedDate,
    description: permission.description,
    riskLevel: permission.riskLevel,
    useCases: permission.useCases,
    sourceFile: permission.sourceFile,
  };

  await db
    .insert(graphPermissions)
    .values(insertable)
    .onConflictDoUpdate({
      target: graphPermissions.name,
      set: {
        displayName: insertable.displayName,
        permissionId: insertable.permissionId,
        type: insertable.type,
        scope: insertable.scope,
        adminConsentRequired: insertable.adminConsentRequired,
        assignedDate: insertable.assignedDate,
        description: insertable.description,
        riskLevel: insertable.riskLevel,
        useCases: insertable.useCases,
        sourceFile: insertable.sourceFile,
        updatedAt: new Date(),
      },
    });
}

async function main(): Promise<void> {
  const entries = await fs.readdir(PERMISSIONS_DIR);
  const markdownFiles = entries.filter(
    (file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md",
  );

  console.log(`Found ${markdownFiles.length} permission files.`);

  for (const file of markdownFiles) {
    const fullPath = path.join(PERMISSIONS_DIR, file);
    const content = await fs.readFile(fullPath, "utf-8");
    const parsed = parsePermission(content, path.relative(process.cwd(), fullPath));
    await upsertPermission(parsed);
    console.log(`Upserted ${parsed.name}`);
  }

  const [summary] = await db
    .select({ total: count() })
    .from(graphPermissions);

  console.log(
    `Ingestion completed. Total permissions stored: ${summary?.total ?? "unknown"}.`,
  );
}

main().catch((error) => {
  console.error("Failed to ingest Graph permissions", error);
  process.exit(1);
});
