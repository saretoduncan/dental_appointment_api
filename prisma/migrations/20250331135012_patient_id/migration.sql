/*
  Warnings:

  - A unique constraint covering the columns `[national_id_no]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Patient_national_id_no_key` ON `Patient`(`national_id_no`);
