/*
  Warnings:

  - Added the required column `first_name` to the `NextOfKeen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_Name` to the `NextOfKeen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `NextOfKeen` ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_Name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserProfile` MODIFY `national_id_no` VARCHAR(191) NOT NULL;
