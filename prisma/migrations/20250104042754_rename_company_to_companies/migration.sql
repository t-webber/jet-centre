/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_addressId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyInfos" DROP CONSTRAINT "CompanyInfos_companyId_fkey";

-- DropTable
DROP TABLE "Company";

-- CreateTable
CREATE TABLE "Companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Companies_name_key" ON "Companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_addressId_key" ON "Companies"("addressId");

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyInfos" ADD CONSTRAINT "CompanyInfos_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
