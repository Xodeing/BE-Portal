/*
  Warnings:

  - Added the required column `eventId` to the `speaker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "speaker" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "speaker" ADD CONSTRAINT "speaker_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
