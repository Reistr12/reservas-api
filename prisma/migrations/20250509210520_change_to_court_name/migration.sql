/*
  Warnings:

  - You are about to drop the column `courtId` on the `booking` table. All the data in the column will be lost.
  - The primary key for the `court` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `court` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courtName,date,startTime]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Court` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courtName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_courtId_fkey`;

-- DropIndex
DROP INDEX `Booking_courtId_fkey` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `courtId`,
    ADD COLUMN `courtName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `court` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Booking_courtName_date_startTime_key` ON `Booking`(`courtName`, `date`, `startTime`);

-- CreateIndex
CREATE UNIQUE INDEX `Court_name_key` ON `Court`(`name`);

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_courtName_fkey` FOREIGN KEY (`courtName`) REFERENCES `Court`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
