/*
  Warnings:

  - Added the required column `updatedAt` to the `CachePrompts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CacheResponses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CacheWords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CachePrompts" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "meta" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CacheResponses" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "meta" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CacheWords" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "meta" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
