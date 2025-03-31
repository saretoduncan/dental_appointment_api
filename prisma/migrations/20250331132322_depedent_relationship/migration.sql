/*
  Warnings:

  - You are about to drop the column `guadian_relationship` on the `DependentPatient` table. All the data in the column will be lost.
  - Added the required column `dependent_relationship` to the `DependentPatient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DependentPatient` DROP COLUMN `guadian_relationship`,
    ADD COLUMN `dependent_relationship` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NULL;
