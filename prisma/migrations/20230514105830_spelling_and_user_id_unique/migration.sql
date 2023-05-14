/*
  Warnings:

  - A unique constraint covering the columns `[spelling,userId]` on the table `GreWords` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GreWords_spelling_key";

-- CreateIndex
CREATE UNIQUE INDEX "GreWords_spelling_userId_key" ON "GreWords"("spelling", "userId");
