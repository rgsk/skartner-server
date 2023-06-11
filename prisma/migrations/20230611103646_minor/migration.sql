/*
  Warnings:

  - You are about to drop the column `endedAt - startedAt` on the `UserSessions` table. All the data in the column will be lost.
  - Added the required column `extract(epoch from (endedAt - startedAt))` to the `UserSessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSessions" DROP COLUMN "endedAt - startedAt",
ADD COLUMN     "extract(epoch from (endedAt - startedAt))" INTEGER NOT NULL;
