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

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
