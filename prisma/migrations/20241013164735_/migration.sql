/*
  Warnings:

  - Added the required column `userId` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_speakerId_fkey";

-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "speaker" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "instagram" TEXT,
    "x" TEXT,
    "facebook" TEXT,
    "linkedin" TEXT,
    "photo" TEXT,

    CONSTRAINT "speaker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "speaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
