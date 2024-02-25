import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const credentials = pgTable("credentials", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});
