-- AlterTable
ALTER TABLE "UserSessions" ADD COLUMN     "meta" JSONB NOT NULL DEFAULT '{}';
