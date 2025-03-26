/*
  Warnings:

  - A unique constraint covering the columns `[access_level]` on the table `AccessLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `AccessLevel_access_level_key` ON `AccessLevel`(`access_level`);
