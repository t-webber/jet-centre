/*
  Warnings:

  - You are about to drop the column `companyId` on the `CompanyInfos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyInfosId]` on the table `Companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyInfosId` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyInfos" DROP CONSTRAINT "CompanyInfos_companyId_fkey";

-- DropIndex
DROP INDEX "CompanyInfos_companyId_key";

-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "companyInfosId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CompanyInfos" DROP COLUMN "companyId";

-- CreateIndex
CREATE UNIQUE INDEX "Companies_companyInfosId_key" ON "Companies"("companyInfosId");

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_companyInfosId_fkey" FOREIGN KEY ("companyInfosId") REFERENCES "CompanyInfos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
