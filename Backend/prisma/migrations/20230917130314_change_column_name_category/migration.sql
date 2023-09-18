/*
  Warnings:

  - You are about to drop the column `catergory` on the `post` table. All the data in the column will be lost.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `catergory`,
    ADD COLUMN `category` ENUM('sport', 'healt', 'business', 'fashion', 'technology') NOT NULL;
