/*
  Warnings:

  - You are about to drop the column `patient_child_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `Patient_Child` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_patient_child_id_fkey`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `Patient_Child` DROP FOREIGN KEY `Patient_Child_guardian_id_fkey`;

-- DropIndex
DROP INDEX `Appointment_patient_child_id_fkey` ON `Appointment`;

-- DropIndex
DROP INDEX `Appointment_patient_id_fkey` ON `Appointment`;

-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `patient_child_id`,
    ADD COLUMN `dependent_patient_id` VARCHAR(191) NULL,
    MODIFY `patient_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Patient_Child`;

-- CreateTable
CREATE TABLE `DependantPatient` (
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
ALTER TABLE `DependantPatient` ADD CONSTRAINT `DependantPatient_guardian_id_fkey` FOREIGN KEY (`guardian_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_dependent_patient_id_fkey` FOREIGN KEY (`dependent_patient_id`) REFERENCES `DependantPatient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
