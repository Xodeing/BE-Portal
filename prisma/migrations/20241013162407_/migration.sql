/*
  Warnings:

  - You are about to drop the column `userId` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the `speaker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_speakerId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_userId_fkey";

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "userId";

-- DropTable
DROP TABLE "speaker";

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
