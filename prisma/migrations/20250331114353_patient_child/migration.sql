/*
  Warnings:

  - You are about to drop the column `guardian_name` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `guardian_number` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `guardian_relationship` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `patient_child_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `national_id_no` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone_number` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Appointment` ADD COLUMN `patient_child_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Patient` DROP COLUMN `guardian_name`,
    DROP COLUMN `guardian_number`,
    DROP COLUMN `guardian_relationship`,
    ADD COLUMN `national_id_no` VARCHAR(191) NOT NULL,
    MODIFY `phone_number` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Patient_Child` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `guardian_id` VARCHAR(191) NOT NULL,
    `guadian_relationship` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patient_Child` ADD CONSTRAINT `Patient_Child_guardian_id_fkey` FOREIGN KEY (`guardian_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_patient_child_id_fkey` FOREIGN KEY (`patient_child_id`) REFERENCES `Patient_Child`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
