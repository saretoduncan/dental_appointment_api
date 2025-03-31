/*
  Warnings:

  - You are about to drop the `DependantPatient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_dependent_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `DependantPatient` DROP FOREIGN KEY `DependantPatient_guardian_id_fkey`;

-- DropIndex
DROP INDEX `Appointment_dependent_patient_id_fkey` ON `Appointment`;

-- DropTable
DROP TABLE `DependantPatient`;

-- CreateTable
CREATE TABLE `DependentPatient` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `primary_care_giver_id` VARCHAR(191) NOT NULL,
    `guadian_relationship` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DependentPatient` ADD CONSTRAINT `DependentPatient_primary_care_giver_id_fkey` FOREIGN KEY (`primary_care_giver_id`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_dependent_patient_id_fkey` FOREIGN KEY (`dependent_patient_id`) REFERENCES `DependentPatient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
