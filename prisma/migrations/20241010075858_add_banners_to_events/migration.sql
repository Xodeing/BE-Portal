-- CreateTable
CREATE TABLE "galery" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "namePicture" TEXT NOT NULL,
    "galeryCategoryId" INTEGER NOT NULL,
    "bannerId" INTEGER NOT NULL,

    CONSTRAINT "galery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeryCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "categoryGalery" TEXT NOT NULL,

    CONSTRAINT "galeryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "titleBanner" TEXT NOT NULL,
    "seatMax" INTEGER NOT NULL,
    "speakerCount" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "galery" ADD CONSTRAINT "galery_galeryCategoryId_fkey" FOREIGN KEY ("galeryCategoryId") REFERENCES "galeryCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galery" ADD CONSTRAINT "galery_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "banner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banner" ADD CONSTRAINT "banner_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
