/*
  Warnings:

  - The values [VIDEO] on the enum `Media_name` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Media` MODIFY `name` ENUM('BANNER', 'THUMBNAIL', 'LOGO', 'IMAGE') NOT NULL;
