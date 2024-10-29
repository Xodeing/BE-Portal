/*
  Warnings:

  - Added the required column `ticketName` to the `eventTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeTicket` to the `eventTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventTicket" ADD COLUMN     "ticketName" TEXT NOT NULL,
ADD COLUMN     "typeTicket" TEXT NOT NULL;
