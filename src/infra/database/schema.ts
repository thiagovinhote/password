import * as crypto from "crypto";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const adonisSchema = pgTable("adonis_schema", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  batch: integer("batch").notNull(),
  migrationTime: timestamp("migration_time", {
    withTimezone: true,
  }).defaultNow(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull().$defaultFn(crypto.randomUUID),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 180 }).notNull(),
    rememberMeToken: varchar("remember_me_token", { length: 255 }),
    kindeId: varchar("kinde_id", { length: 255 }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }),
    picture: varchar("picture", { length: 255 }),
  },
  (table) => {
    return {
      usersEmailUnique: unique("users_email_unique").on(table.email),
      kindeIdIndex: index("kinde_id_index").on(table.kindeId),
    };
  },
);

export const credentials = pgTable(
  "credentials",
  {
    id: uuid("id").primaryKey().notNull().$defaultFn(crypto.randomUUID),
    name: varchar("name", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      nameIdx: index().on(table.name),
      usernameIdx: index().on(table.username),
    };
  },
);

export const tags = pgTable(
  "tags",
  {
    id: uuid("id").primaryKey().notNull().$defaultFn(crypto.randomUUID),
    label: varchar("label", { length: 255 }).notNull(),
    color: varchar("color", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      tagsLabelUserIdUnique: unique("tags_label_user_id_unique").on(
        table.label,
        table.userId,
      ),
    };
  },
);

export const folders = pgTable(
  "folders",
  {
    id: uuid("id").primaryKey().notNull().$defaultFn(crypto.randomUUID),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      foldersNameUnique: unique("folders_name_unique").on(table.name),
    };
  },
);

export const folderCredential = pgTable(
  "folder_credential",
  {
    id: uuid("id").primaryKey().notNull().$defaultFn(crypto.randomUUID),
    folderId: uuid("folder_id")
      .notNull()
      .references(() => folders.id, { onDelete: "cascade" }),
    credentialId: uuid("credential_id")
      .notNull()
      .references(() => credentials.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => {
    return {
      folderCredentialFolderIdCredentialIdUnique: unique(
        "folder_credential_folder_id_credential_id_unique",
      ).on(table.folderId, table.credentialId),
    };
  },
);

export const credentialTag = pgTable(
  "credential_tag",
  {
    id: uuid("id").primaryKey().notNull().$defaultFn(crypto.randomUUID),
    credentialId: uuid("credential_id")
      .notNull()
      .references(() => credentials.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => {
    return {
      credentialTagCredentialIdTagIdUnique: unique(
        "credential_tag_credential_id_tag_id_unique",
      ).on(table.credentialId, table.tagId),
    };
  },
);
