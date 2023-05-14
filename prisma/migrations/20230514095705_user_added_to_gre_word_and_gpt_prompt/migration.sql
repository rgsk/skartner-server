-- AlterTable
ALTER TABLE "GptPrompts" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "GreWords" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "GreWords" ADD CONSTRAINT "GreWords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GptPrompts" ADD CONSTRAINT "GptPrompts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
