import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, PoolConfig } from "pg";

import * as schema from "./schema";

const config: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") {
  config.ssl = { rejectUnauthorized: false };
}

export const client = new Pool(config);

const db = drizzle(client, { schema });

export default db;
