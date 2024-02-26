"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import db from "~/infra/database/drizzle";
import { credentials, users } from "~/infra/database/schema";

import { CreateCredentialSchema } from "./schemas";

async function getDbUser() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.kindeId, kindeUser!.id))
    .limit(1);
  return dbUser;
}

export default async function createCredentialRepo(
  input: z.input<typeof CreateCredentialSchema>,
) {
  const safeInput = CreateCredentialSchema.parse(input);
  const user = await getDbUser();

  await db.insert(credentials).values({ ...safeInput, userId: user!.id });
}
