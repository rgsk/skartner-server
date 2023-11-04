/*
  Warnings:

  - You are about to drop the column `userId` on the `GreWordSearchPromptInputs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GreWordSearchPromptInputs" DROP CONSTRAINT "GreWordSearchPromptInputs_userId_fkey";

-- AlterTable
ALTER TABLE "GreWordSearchPromptInputs" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_GreWordSearchPromptInputToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GreWordSearchPromptInputToUser_AB_unique" ON "_GreWordSearchPromptInputToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GreWordSearchPromptInputToUser_B_index" ON "_GreWordSearchPromptInputToUser"("B");

-- AddForeignKey
ALTER TABLE "_GreWordSearchPromptInputToUser" ADD CONSTRAINT "_GreWordSearchPromptInputToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GreWordSearchPromptInputs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GreWordSearchPromptInputToUser" ADD CONSTRAINT "_GreWordSearchPromptInputToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
