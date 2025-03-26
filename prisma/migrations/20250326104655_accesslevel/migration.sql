/*
  Warnings:

  - You are about to drop the column `role` on the `AccessLevel` table. All the data in the column will be lost.
  - Added the required column `access_level` to the `AccessLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AccessLevel` DROP COLUMN `role`,
    ADD COLUMN `access_level` VARCHAR(191) NOT NULL;
