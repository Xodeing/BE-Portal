/*
  Warnings:

  - You are about to drop the `_EventsToSponsors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventsToVenue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `sponsors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EventsToSponsors" DROP CONSTRAINT "_EventsToSponsors_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToSponsors" DROP CONSTRAINT "_EventsToSponsors_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_B_fkey";

-- AlterTable
ALTER TABLE "sponsors" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "venue" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_EventsToSponsors";

-- DropTable
DROP TABLE "_EventsToVenue";

-- AddForeignKey
ALTER TABLE "venue" ADD CONSTRAINT "venue_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
