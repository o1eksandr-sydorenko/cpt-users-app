CREATE UNIQUE INDEX "unique_active_email" ON "users"("email") WHERE "deleted_at" IS NULL;
