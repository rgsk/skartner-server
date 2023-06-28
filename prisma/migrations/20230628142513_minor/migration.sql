/*
  Warnings:

  - You are about to drop the column `expirationTime` on the `Cache` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cache" DROP COLUMN "expirationTime",
ALTER COLUMN "expirationTimestamp" DROP NOT NULL;
