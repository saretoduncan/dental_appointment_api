/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Patient_phone_number_key` ON `Patient`(`phone_number`);
