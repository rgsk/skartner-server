-- AlterTable
ALTER TABLE "UserSessions" ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "duration" DROP DEFAULT;
