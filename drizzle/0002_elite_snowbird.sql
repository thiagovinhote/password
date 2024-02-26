ALTER TABLE "users" ADD COLUMN "kinde_id" varchar(255);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "kinde_id_index" ON "users" ("kinde_id");