import { asc, desc, ilike } from "drizzle-orm";
import { z } from "zod";

import db from "~/infra/database/drizzle";
import { credentials } from "~/infra/database/schema";

const AllCredentialsInput = z.object({
  search: z
    .string()
    .optional()
    .transform((arg) => {
      if (!arg) return undefined;
      return ilike(credentials.name, `%${arg}%`);
    }),
  page: z.number().optional().default(1),
  perPage: z.number().optional().default(10),
  orderBy: z
    .string()
    .nullish()
    .transform((arg) => {
      if (!arg) return undefined;
      if (arg.includes("-")) return desc(credentials[arg.slice(1)]);
      return asc(credentials[arg]);
    }),
});

export default async function allCredentialsRepo(
  input: z.input<typeof AllCredentialsInput>,
) {
  const safeInput = AllCredentialsInput.parse(input);
  const skip = (safeInput.page - 1) * safeInput.perPage;

  return db.query.credentials.findMany({
    where: safeInput.search,
    offset: skip,
    limit: safeInput.perPage,
    orderBy: safeInput.orderBy,
  });
}
