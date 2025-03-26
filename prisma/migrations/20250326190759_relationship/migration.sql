/*
  Warnings:

  - You are about to drop the column `Relationship` on the `NextOfKeen` table. All the data in the column will be lost.
  - Added the required column `relationship` to the `NextOfKeen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `NextOfKeen` DROP COLUMN `Relationship`,
    ADD COLUMN `relationship` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NULL;
