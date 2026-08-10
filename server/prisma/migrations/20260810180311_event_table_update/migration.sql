/*
  Warnings:

  - You are about to drop the column `deadLine` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deadline` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationLink` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `deadLine`,
    ADD COLUMN `deadline` DATETIME(3) NOT NULL,
    ADD COLUMN `locationLink` VARCHAR(191) NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `regLink` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Event_slug_key` ON `Event`(`slug`);
