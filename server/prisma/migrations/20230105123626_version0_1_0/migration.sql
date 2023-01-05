/*
  Warnings:

  - You are about to drop the column `name` on the `EmployerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `EmployerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `EmployerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `county` to the `EmployerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetName` to the `EmployerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `EmployerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `county` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EmployerProfile` DROP COLUMN `name`,
    DROP COLUMN `state`,
    ADD COLUMN `companyName` VARCHAR(191) NOT NULL,
    ADD COLUMN `county` VARCHAR(191) NOT NULL,
    ADD COLUMN `streetName` VARCHAR(191) NOT NULL,
    ADD COLUMN `streetNumber` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `UserProfile` DROP COLUMN `location`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `county` VARCHAR(191) NOT NULL;
