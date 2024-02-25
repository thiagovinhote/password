"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "~/infra/database/drizzle";
import { credentials } from "~/infra/database/schema";

export default async function deleteCredentialRepo(id: string) {
  await db.delete(credentials).where(eq(credentials.id, id));
  revalidatePath("/credentials");
}
