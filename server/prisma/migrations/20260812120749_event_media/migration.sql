/*
  Warnings:

  - You are about to drop the column `bannerImage` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `logoImage` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `regLink` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `bannerImage`,
    DROP COLUMN `logoImage`,
    DROP COLUMN `regLink`,
    DROP COLUMN `website`;

-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('BANNER', 'VIDEO', 'LOGO', 'IMAGE') NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `eventId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
