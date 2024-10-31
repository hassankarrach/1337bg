// lib/db.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient({
  log: ['error', 'warn']
});

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}