-- CreateTable
CREATE TABLE "Cache" (
    "id" TEXT NOT NULL,
    "key" JSONB NOT NULL,
    "value" JSONB NOT NULL,
    "expirationTime" INTEGER NOT NULL,
    "expirationTimestamp" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cache_key_key" ON "Cache"("key");
