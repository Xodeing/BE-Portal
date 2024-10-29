/*
  Warnings:

  - You are about to drop the column `userId` on the `schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_userId_fkey";

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "userId";
