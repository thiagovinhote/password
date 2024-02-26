ALTER TABLE "credentials" DROP CONSTRAINT "credentials_user_id_foreign";
--> statement-breakpoint
ALTER TABLE "tags" DROP CONSTRAINT "tags_user_id_foreign";
--> statement-breakpoint
ALTER TABLE "folders" DROP CONSTRAINT "folders_user_id_foreign";
--> statement-breakpoint
ALTER TABLE "folder_credential" DROP CONSTRAINT "folder_credential_folder_id_foreign";
--> statement-breakpoint
ALTER TABLE "folder_credential" DROP CONSTRAINT "folder_credential_credential_id_foreign";
--> statement-breakpoint
ALTER TABLE "credential_tag" DROP CONSTRAINT "credential_tag_credential_id_foreign";
--> statement-breakpoint
ALTER TABLE "credential_tag" DROP CONSTRAINT "credential_tag_tag_id_foreign";
--> statement-breakpoint
ALTER TABLE "adonis_schema" ALTER COLUMN "migration_time" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "folder_credential" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "credential_tag" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credentials" ADD CONSTRAINT "credentials_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folders" ADD CONSTRAINT "folders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folder_credential" ADD CONSTRAINT "folder_credential_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folder_credential" ADD CONSTRAINT "folder_credential_credential_id_credentials_id_fk" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credential_tag" ADD CONSTRAINT "credential_tag_credential_id_credentials_id_fk" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credential_tag" ADD CONSTRAINT "credential_tag_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
