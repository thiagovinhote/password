import crypto from "crypto";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().$defaultFn(crypto.randomUUID),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("name", { length: 256 }).notNull(),
});

export const credentials = pgTable("credentials", {
  id: uuid("id").primaryKey().defaultRandom().$defaultFn(crypto.randomUUID),
  name: varchar("name", { length: 256 }).notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export type Credential = typeof credentials.$inferSelect;
