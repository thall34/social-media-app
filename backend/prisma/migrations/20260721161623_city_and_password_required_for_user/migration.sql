/*
  Warnings:

  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profilePicCloudId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profilePicFilePath` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "profilePicCloudId" SET NOT NULL,
ALTER COLUMN "profilePicFilePath" SET NOT NULL;
