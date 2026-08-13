/*
  Warnings:

  - You are about to alter the column `title` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `description` VARCHAR(2000) NOT NULL;
