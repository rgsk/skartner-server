/*
  Warnings:

  - You are about to drop the column `spelling` on the `GreWords` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cacheWordId,userId]` on the table `GreWords` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cacheWordId` to the `GreWords` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GreWords_spelling_userId_key";

-- AlterTable
ALTER TABLE "GreWords" DROP COLUMN "spelling",
ADD COLUMN     "cacheWordId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GreWords_cacheWordId_userId_key" ON "GreWords"("cacheWordId", "userId");

-- AddForeignKey
ALTER TABLE "GreWords" ADD CONSTRAINT "GreWords_cacheWordId_fkey" FOREIGN KEY ("cacheWordId") REFERENCES "CacheWords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
