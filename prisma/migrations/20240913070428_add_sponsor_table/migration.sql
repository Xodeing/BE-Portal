-- CreateTable
CREATE TABLE "sponsors" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "sponsorName" TEXT NOT NULL,
    "sponsorWebLink" TEXT,
    "sponsorLogo" TEXT,

    CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id")
);
