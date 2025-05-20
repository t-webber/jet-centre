/*
  Warnings:

  - You are about to drop the column `addressId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `Person` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_addressId_fkey";

-- DropIndex
DROP INDEX "Company_addressId_key";

-- DropIndex
DROP INDEX "Person_addressId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "personId" TEXT;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "addressId";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "Address_personId_key" ON "Address"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_companyId_key" ON "Address"("companyId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
