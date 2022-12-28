-- AlterTable
ALTER TABLE `ListingApplications` ADD COLUMN `listingOwnerId` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `ListingApplications` ADD CONSTRAINT `ListingApplications_listingOwnerId_fkey` FOREIGN KEY (`listingOwnerId`) REFERENCES `EmployerProfile`(`employerId`) ON DELETE RESTRICT ON UPDATE CASCADE;
