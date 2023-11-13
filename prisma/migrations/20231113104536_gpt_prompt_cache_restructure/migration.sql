/*
  Warnings:

  - You are about to drop the column `input` on the `GptPrompts` table. All the data in the column will be lost.
  - You are about to drop the column `response` on the `GptPrompts` table. All the data in the column will be lost.
  - Added the required column `cacheResponseId` to the `GptPrompts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GptPrompts" DROP COLUMN "input",
DROP COLUMN "response",
ADD COLUMN     "cacheResponseId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CachePrompts" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "CachePrompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CacheWords" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "CacheWords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CacheResponses" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "cachePromptId" TEXT NOT NULL,
    "cacheWordId" TEXT NOT NULL,

    CONSTRAINT "CacheResponses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CachePrompts_text_key" ON "CachePrompts"("text");

-- CreateIndex
CREATE UNIQUE INDEX "CacheWords_text_key" ON "CacheWords"("text");

-- CreateIndex
CREATE UNIQUE INDEX "CacheResponses_text_key" ON "CacheResponses"("text");

-- AddForeignKey
ALTER TABLE "GptPrompts" ADD CONSTRAINT "GptPrompts_cacheResponseId_fkey" FOREIGN KEY ("cacheResponseId") REFERENCES "CacheResponses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CacheResponses" ADD CONSTRAINT "CacheResponses_cachePromptId_fkey" FOREIGN KEY ("cachePromptId") REFERENCES "CachePrompts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CacheResponses" ADD CONSTRAINT "CacheResponses_cacheWordId_fkey" FOREIGN KEY ("cacheWordId") REFERENCES "CacheWords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
