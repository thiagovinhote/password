"use server";

import { eq } from "drizzle-orm";

import db from "~/infra/database/drizzle";
import { credentials } from "~/infra/database/schema";

export default async function revealPasswordRepo(id: string) {
  const { Encryption } = await import("@adonisjs/encryption");

  const encryption = new Encryption({
    algorithm: "aes-256-cbc",
    secret: process.env.APP_KEY,
  });

  const record = await db.query.credentials.findFirst({
    where: eq(credentials.id, id),
    columns: { password: true },
  });

  return String(encryption.decrypt(record?.password) ?? "");
}
