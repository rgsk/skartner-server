-- AlterTable
ALTER TABLE "GptPrompts" ADD COLUMN     "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "GreWords" ADD COLUMN     "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];
