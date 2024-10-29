/*
  Warnings:

  - You are about to drop the `_EventsToSponsors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventsToVenue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event-categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eventTicket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participantLists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticketTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `venue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventsToSponsors" DROP CONSTRAINT "_EventsToSponsors_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToSponsors" DROP CONSTRAINT "_EventsToSponsors_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToVenue" DROP CONSTRAINT "_EventsToVenue_B_fkey";

-- DropForeignKey
ALTER TABLE "eventTicket" DROP CONSTRAINT "eventTicket_eventId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_eventCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_userId_fkey";

-- DropForeignKey
ALTER TABLE "participantLists" DROP CONSTRAINT "participantLists_eventId_fkey";

-- DropForeignKey
ALTER TABLE "participantLists" DROP CONSTRAINT "participantLists_participantId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_eventId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_speakerId_fkey";

-- DropForeignKey
ALTER TABLE "ticketTransaction" DROP CONSTRAINT "ticketTransaction_participantId_fkey";

-- DropForeignKey
ALTER TABLE "ticketTransaction" DROP CONSTRAINT "ticketTransaction_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_userId_fkey";

-- DropForeignKey
ALTER TABLE "userProfile" DROP CONSTRAINT "userProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- DropIndex
DROP INDEX "roles_roleName_key";

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sponsors" ALTER COLUMN "sponsorWebLink" DROP NOT NULL,
ALTER COLUMN "sponsorLogo" DROP NOT NULL;

-- DropTable
DROP TABLE "_EventsToSponsors";

-- DropTable
DROP TABLE "_EventsToVenue";

-- DropTable
DROP TABLE "event-categories";

-- DropTable
DROP TABLE "eventTicket";

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "participantLists";

-- DropTable
DROP TABLE "schedule";

-- DropTable
DROP TABLE "ticketTransaction";

-- DropTable
DROP TABLE "token";

-- DropTable
DROP TABLE "userProfile";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "venue";

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userName" TEXT,
    "email" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "createdBy" TEXT,
    "googleId" TEXT,
    "updatedBy" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventDateEnd" TIMESTAMP(3) NOT NULL,
    "eventStatus" TEXT NOT NULL,
    "eventCategoryId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "eventLogo" TEXT NOT NULL,
    "eventSeatCount" INTEGER NOT NULL,
    "eventSeatMax" INTEGER NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
