-- AlterTable
ALTER TABLE "GptPrompts" ADD COLUMN     "meta" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "GreWordSearchPromptInputs" ADD COLUMN     "meta" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "GreWords" ADD COLUMN     "greWordTagId" TEXT,
ADD COLUMN     "meta" JSONB NOT NULL DEFAULT '{}';

-- CreateTable
CREATE TABLE "GreWordTags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GreWordTags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GreWordTags_name_key" ON "GreWordTags"("name");

-- AddForeignKey
ALTER TABLE "GreWords" ADD CONSTRAINT "GreWords_greWordTagId_fkey" FOREIGN KEY ("greWordTagId") REFERENCES "GreWordTags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GreWordTags" ADD CONSTRAINT "GreWordTags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
