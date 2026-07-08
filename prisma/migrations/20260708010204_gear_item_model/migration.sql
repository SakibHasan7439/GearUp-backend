-- CreateTable
CREATE TABLE "GearItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GearItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GearItem_userId_idx" ON "GearItem"("userId");

-- CreateIndex
CREATE INDEX "GearItem_categoryId_idx" ON "GearItem"("categoryId");

-- AddForeignKey
ALTER TABLE "GearItem" ADD CONSTRAINT "GearItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GearItem" ADD CONSTRAINT "GearItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
