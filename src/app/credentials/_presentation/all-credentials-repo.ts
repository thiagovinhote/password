import db from "~/infra/database/drizzle";

export default async function allCredentialsRepo() {
  return db.query.credentials.findMany({
    limit: 10,
  });
}
