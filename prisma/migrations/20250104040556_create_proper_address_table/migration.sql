/*
  Warnings:

  - You are about to drop the column `address` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `People` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "address",
ADD COLUMN     "addressId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "People" DROP COLUMN "address",
ADD COLUMN     "addressId" TEXT;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_addressId_key" ON "Company"("addressId");

-- AddForeignKey
ALTER TABLE "People" ADD CONSTRAINT "People_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
