/*
  Warnings:

  - You are about to drop the column `greWordTagId` on the `GreWords` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GreWords" DROP CONSTRAINT "GreWords_greWordTagId_fkey";

-- AlterTable
ALTER TABLE "GreWords" DROP COLUMN "greWordTagId";

-- CreateTable
CREATE TABLE "_GreWordToGreWordTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GreWordToGreWordTag_AB_unique" ON "_GreWordToGreWordTag"("A", "B");

-- CreateIndex
CREATE INDEX "_GreWordToGreWordTag_B_index" ON "_GreWordToGreWordTag"("B");

-- AddForeignKey
ALTER TABLE "_GreWordToGreWordTag" ADD CONSTRAINT "_GreWordToGreWordTag_A_fkey" FOREIGN KEY ("A") REFERENCES "GreWords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GreWordToGreWordTag" ADD CONSTRAINT "_GreWordToGreWordTag_B_fkey" FOREIGN KEY ("B") REFERENCES "GreWordTags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
