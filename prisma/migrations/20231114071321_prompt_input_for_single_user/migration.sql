/*
  Warnings:

  - You are about to drop the `_GreWordSearchPromptInputToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `GreWordSearchPromptInputs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GreWordSearchPromptInputToUser" DROP CONSTRAINT "_GreWordSearchPromptInputToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GreWordSearchPromptInputToUser" DROP CONSTRAINT "_GreWordSearchPromptInputToUser_B_fkey";

-- AlterTable
ALTER TABLE "GreWordSearchPromptInputs" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_GreWordSearchPromptInputToUser";

-- AddForeignKey
ALTER TABLE "GreWordSearchPromptInputs" ADD CONSTRAINT "GreWordSearchPromptInputs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
