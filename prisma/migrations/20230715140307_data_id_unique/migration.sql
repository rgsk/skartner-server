/*
  Warnings:

  - A unique constraint covering the columns `[dataId]` on the table `CricketPlayer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CricketPlayer_dataId_key" ON "CricketPlayer"("dataId");
