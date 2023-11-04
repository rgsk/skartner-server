/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `GreWordTags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GreWordTags_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "GreWordTags_name_userId_key" ON "GreWordTags"("name", "userId");
