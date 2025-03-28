/*
  Warnings:

  - You are about to drop the column `role` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `job_title` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserProfile` DROP COLUMN `role`,
    ADD COLUMN `job_title` VARCHAR(191) NOT NULL;
