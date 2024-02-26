import { migrate } from "drizzle-orm/node-postgres/migrator";

import db, { client } from "./drizzle";

migrate(db, { migrationsFolder: "./drizzle" }).then(() => {
  console.log("ok");
  return client.end();
});
