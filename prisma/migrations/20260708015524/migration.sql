/*
  Warnings:

  - Added the required column `availableQuantity` to the `GearItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuantity` to the `GearItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GearItem" ADD COLUMN     "availableQuantity" INTEGER NOT NULL,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "brand" SET DATA TYPE VARCHAR;
