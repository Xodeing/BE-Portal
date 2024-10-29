/*
  Warnings:

  - The `eventStatus` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `userProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "sponsors" DROP CONSTRAINT "sponsors_eventId_fkey";

-- DropForeignKey
ALTER TABLE "venue" DROP CONSTRAINT "venue_eventId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "eventStatus",
ADD COLUMN     "eventStatus" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sponsors" ALTER COLUMN "eventId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "venue" ALTER COLUMN "eventId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_userId_key" ON "userProfile"("userId");

-- AddForeignKey
ALTER TABLE "venue" ADD CONSTRAINT "venue_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
