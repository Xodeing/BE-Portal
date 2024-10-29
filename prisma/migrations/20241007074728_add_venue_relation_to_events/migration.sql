/*
  Warnings:

  - You are about to drop the `_EventsToVenue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_B_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "venueId" INTEGER;

-- DropTable
DROP TABLE "_EventsToVenue";

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
