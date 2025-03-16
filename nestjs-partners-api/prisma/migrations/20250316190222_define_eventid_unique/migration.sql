/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Spot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Spot_eventId_key` ON `Spot`(`eventId`);
