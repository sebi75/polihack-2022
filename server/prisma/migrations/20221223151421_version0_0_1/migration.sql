/*
  Warnings:

  - You are about to drop the column `isEmployer` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Employer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isVerified` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profilePicture` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthday` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `about` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Employer` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `isEmployer`,
    MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `isVerified` BOOLEAN NOT NULL,
    MODIFY `profilePicture` VARCHAR(191) NOT NULL,
    MODIFY `birthday` DATETIME(3) NOT NULL,
    MODIFY `location` VARCHAR(191) NOT NULL,
    MODIFY `about` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employer_userId_key` ON `Employer`(`userId`);

-- AddForeignKey
ALTER TABLE `Employer` ADD CONSTRAINT `Employer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
