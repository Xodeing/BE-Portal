/*
  Warnings:

  - You are about to drop the column `venueId` on the `events` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_venueId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "venueId";

-- CreateTable
CREATE TABLE "_EventsToVenue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToVenue_AB_unique" ON "_EventsToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToVenue_B_index" ON "_EventsToVenue"("B");

-- AddForeignKey
ALTER TABLE "_EventsToVenue" ADD CONSTRAINT "_EventsToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToVenue" ADD CONSTRAINT "_EventsToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
