-- CreateTable
CREATE TABLE "GreWords" (
    "id" TEXT NOT NULL,
    "spelling" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GreWords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GptPrompts" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "greWordId" TEXT,

    CONSTRAINT "GptPrompts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GreWords_spelling_key" ON "GreWords"("spelling");

-- AddForeignKey
ALTER TABLE "GptPrompts" ADD CONSTRAINT "GptPrompts_greWordId_fkey" FOREIGN KEY ("greWordId") REFERENCES "GreWords"("id") ON DELETE SET NULL ON UPDATE CASCADE;
