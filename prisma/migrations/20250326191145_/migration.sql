/*
  Warnings:

  - You are about to drop the column `user_id` on the `NextOfKeen` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `NextOfKeen` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `NextOfKeen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `NextOfKeen` DROP FOREIGN KEY `NextOfKeen_user_id_fkey`;

-- DropIndex
DROP INDEX `NextOfKeen_user_id_key` ON `NextOfKeen`;

-- AlterTable
ALTER TABLE `NextOfKeen` DROP COLUMN `user_id`,
    ADD COLUMN `profile_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `NextOfKeen_profile_id_key` ON `NextOfKeen`(`profile_id`);

-- AddForeignKey
ALTER TABLE `NextOfKeen` ADD CONSTRAINT `NextOfKeen_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
