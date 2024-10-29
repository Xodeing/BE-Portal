/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roleName]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sponsorWebLink` on table `sponsors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sponsorLogo` on table `sponsors` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_authorId_fkey";

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "sponsors" ALTER COLUMN "sponsorWebLink" SET NOT NULL,
ALTER COLUMN "sponsorLogo" SET NOT NULL;

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "googleId" TEXT,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userProfile" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "affiliateLink" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "eventName" TEXT NOT NULL,
    "eventDateStart" TIMESTAMP(3) NOT NULL,
    "eventDateEnd" TIMESTAMP(3) NOT NULL,
    "eventStatus" TEXT NOT NULL,
    "eventSeatMax" INTEGER NOT NULL,
    "eventSeatCount" INTEGER NOT NULL,
    "eventLogo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventCategoryId" INTEGER NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event-categories" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "categoryName" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "event-categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "activityStart" TIMESTAMP(3) NOT NULL,
    "activityEnd" TIMESTAMP(3) NOT NULL,
    "speakerId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "venueName" TEXT NOT NULL,
    "venueDesc" TEXT NOT NULL,
    "venueAddress" TEXT NOT NULL,
    "venueCity" TEXT NOT NULL,
    "venueGMapsLocation" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,

    CONSTRAINT "venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participantLists" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "attendance" BOOLEAN NOT NULL,
    "attendanceTime" TIMESTAMP(3) NOT NULL,
    "participantId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "participantLists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventTicket" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "ticketPrice" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "seatCount" INTEGER NOT NULL,
    "seatMax" INTEGER NOT NULL,
    "saleStart" TIMESTAMP(3) NOT NULL,
    "saleEnd" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "eventTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticketTransaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "participantId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "ticketTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "event-categories_categoryName_key" ON "event-categories"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "token_token_key" ON "token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToVenue_AB_unique" ON "_EventsToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToVenue_B_index" ON "_EventsToVenue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToSponsors_AB_unique" ON "_EventsToSponsors"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToSponsors_B_index" ON "_EventsToSponsors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "roles_roleName_key" ON "roles"("roleName");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "event-categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantLists" ADD CONSTRAINT "participantLists_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantLists" ADD CONSTRAINT "participantLists_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventTicket" ADD CONSTRAINT "eventTicket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketTransaction" ADD CONSTRAINT "ticketTransaction_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketTransaction" ADD CONSTRAINT "ticketTransaction_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "eventTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToVenue" ADD CONSTRAINT "_EventsToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToVenue" ADD CONSTRAINT "_EventsToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToSponsors" ADD CONSTRAINT "_EventsToSponsors_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToSponsors" ADD CONSTRAINT "_EventsToSponsors_B_fkey" FOREIGN KEY ("B") REFERENCES "sponsors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
