/*
  Warnings:

  - You are about to drop the `_EventSponsors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventVenues` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventSponsors" DROP CONSTRAINT "_EventSponsors_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventSponsors" DROP CONSTRAINT "_EventSponsors_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventVenues" DROP CONSTRAINT "_EventVenues_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventVenues" DROP CONSTRAINT "_EventVenues_B_fkey";

-- DropTable
DROP TABLE "_EventSponsors";

-- DropTable
DROP TABLE "_EventVenues";

-- CreateTable
CREATE TABLE "event_venues" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "venueId" INTEGER NOT NULL,

    CONSTRAINT "event_venues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_sponsors" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "sponsorId" INTEGER NOT NULL,

    CONSTRAINT "event_sponsors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_venues" ADD CONSTRAINT "event_venues_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_venues" ADD CONSTRAINT "event_venues_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_sponsors" ADD CONSTRAINT "event_sponsors_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_sponsors" ADD CONSTRAINT "event_sponsors_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "sponsors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
