-- CreateTable
CREATE TABLE "public"."Url" (
    "id" TEXT NOT NULL,
    "shortId" TEXT NOT NULL,
    "redirectUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "visitHistory" TIMESTAMP(3)[],

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortId_key" ON "public"."Url"("shortId");
