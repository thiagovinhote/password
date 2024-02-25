import { eq } from "drizzle-orm";

import db from "~/infra/database/drizzle";
import { credentials } from "~/infra/database/schema";

export default async function getCredentialRepo(id: string) {
  return db.query.credentials.findFirst({
    where: eq(credentials.id, id),
  });
}
