-- DropForeignKey
ALTER TABLE "sponsors" DROP CONSTRAINT "sponsors_eventId_fkey";

-- DropForeignKey
ALTER TABLE "venue" DROP CONSTRAINT "venue_eventId_fkey";

-- AddForeignKey
ALTER TABLE "venue" ADD CONSTRAINT "venue_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
