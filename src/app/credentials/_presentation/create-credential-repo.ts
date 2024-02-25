"use server";

import { z } from "zod";

import db from "~/infra/database/drizzle";
import { credentials } from "~/infra/database/schema";

import { CreateCredentialSchema } from "./schemas";

export default async function createCredentialRepo(
  input: z.input<typeof CreateCredentialSchema>,
) {
  const safeInput = CreateCredentialSchema.parse(input);
  const firstUser = await db.query.users.findFirst();

  await db.insert(credentials).values({ ...safeInput, userId: firstUser!.id });
}
