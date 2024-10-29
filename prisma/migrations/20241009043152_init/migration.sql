/*
  Warnings:

  - You are about to drop the `event_sponsors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_venues` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "event_sponsors" DROP CONSTRAINT "event_sponsors_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event_sponsors" DROP CONSTRAINT "event_sponsors_sponsorId_fkey";

-- DropForeignKey
ALTER TABLE "event_venues" DROP CONSTRAINT "event_venues_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event_venues" DROP CONSTRAINT "event_venues_venueId_fkey";

-- DropTable
DROP TABLE "event_sponsors";

-- DropTable
DROP TABLE "event_venues";

-- CreateTable
CREATE TABLE "_EventsToVenue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventsToSponsors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToVenue_AB_unique" ON "_EventsToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToVenue_B_index" ON "_EventsToVenue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToSponsors_AB_unique" ON "_EventsToSponsors"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToSponsors_B_index" ON "_EventsToSponsors"("B");

-- AddForeignKey
ALTER TABLE "_EventsToVenue" ADD CONSTRAINT "_EventsToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToVenue" ADD CONSTRAINT "_EventsToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToSponsors" ADD CONSTRAINT "_EventsToSponsors_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToSponsors" ADD CONSTRAINT "_EventsToSponsors_B_fkey" FOREIGN KEY ("B") REFERENCES "sponsors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
