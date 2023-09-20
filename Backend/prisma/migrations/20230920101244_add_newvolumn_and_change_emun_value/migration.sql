/*
  Warnings:

  - The values [healt] on the enum `Post_category` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `content` VARCHAR(2500) NOT NULL,
    MODIFY `category` ENUM('sport', 'health', 'business', 'fashion', 'technology') NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `photo_profile` VARCHAR(191) NULL;
