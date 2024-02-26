import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infra/database/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: String(
      process.env.DATABASE_URL ??
        "postgres://postgres:postgres@localhost:5432/password",
    ),
  },
} satisfies Config;
