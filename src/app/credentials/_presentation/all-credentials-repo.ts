"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { and, asc, count, desc, eq, ilike } from "drizzle-orm";
import { z } from "zod";

import db from "~/infra/database/drizzle";
import { credentials, users } from "~/infra/database/schema";

const AllCredentialsInput = z.object({
  search: z
    .string()
    .optional()
    .transform((arg) => {
      if (!arg) return undefined;
      return ilike(credentials.name, `%${arg}%`);
    }),
  page: z.coerce.number().optional().default(1),
  perPage: z.coerce.number().optional().default(10),
  orderBy: z
    .string()
    .nullish()
    .transform((arg) => {
      if (!arg) return undefined;
      if (arg.includes("-")) return desc(credentials[arg.slice(1)]);
      return asc(credentials[arg]);
    }),
});

async function getDbUser() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser) return null;
  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.kindeId, kindeUser!.id))
    .limit(1);
  return dbUser;
}

export default async function allCredentialsRepo(
  input: z.input<typeof AllCredentialsInput>,
) {
  const user = await getDbUser();
  const safeInput = AllCredentialsInput.parse(input);

  if (!user)
    return {
      records: [],
      total: 0,
      page: safeInput.page,
      perPage: safeInput.perPage,
    };

  const skip = (safeInput.page - 1) * safeInput.perPage;

  const [records, [{ total }]] = await Promise.all([
    db.query.credentials.findMany({
      where: and(safeInput.search, eq(credentials.userId, user.id)),
      offset: skip,
      limit: safeInput.perPage,
      orderBy: safeInput.orderBy,
    }),
    db
      .select({ total: count(credentials.id) })
      .from(credentials)
      .where(and(safeInput.search, eq(credentials.userId, user.id)))
      .limit(1),
  ]);

  return { records, total, page: safeInput.page, perPage: safeInput.perPage };
}
