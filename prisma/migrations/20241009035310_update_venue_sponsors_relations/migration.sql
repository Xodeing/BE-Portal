/*
  Warnings:

  - You are about to drop the `_EventsToSponsors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventsToVenue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventsToSponsors" DROP CONSTRAINT "_EventsToSponsors_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToSponsors" DROP CONSTRAINT "_EventsToSponsors_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_B_fkey";

-- DropTable
DROP TABLE "_EventsToSponsors";

-- DropTable
DROP TABLE "_EventsToVenue";

-- CreateTable
CREATE TABLE "_EventVenues" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventSponsors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventVenues_AB_unique" ON "_EventVenues"("A", "B");

-- CreateIndex
CREATE INDEX "_EventVenues_B_index" ON "_EventVenues"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventSponsors_AB_unique" ON "_EventSponsors"("A", "B");

-- CreateIndex
CREATE INDEX "_EventSponsors_B_index" ON "_EventSponsors"("B");

-- AddForeignKey
ALTER TABLE "_EventVenues" ADD CONSTRAINT "_EventVenues_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventVenues" ADD CONSTRAINT "_EventVenues_B_fkey" FOREIGN KEY ("B") REFERENCES "venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventSponsors" ADD CONSTRAINT "_EventSponsors_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventSponsors" ADD CONSTRAINT "_EventSponsors_B_fkey" FOREIGN KEY ("B") REFERENCES "sponsors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
