/*
  Warnings:

  - You are about to drop the column `studyInfoId` on the `Domains` table. All the data in the column will be lost.
  - You are about to drop the column `domainsId` on the `Studies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Domains" DROP CONSTRAINT "Domains_studyInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Studies" DROP CONSTRAINT "Studies_domainsId_fkey";

-- AlterTable
ALTER TABLE "Domains" DROP COLUMN "studyInfoId";

-- AlterTable
ALTER TABLE "Studies" DROP COLUMN "domainsId";

-- AlterTable
ALTER TABLE "StudyInfo" ADD COLUMN     "domainId" TEXT;

-- AddForeignKey
ALTER TABLE "StudyInfo" ADD CONSTRAINT "StudyInfo_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domains"("id") ON DELETE SET NULL ON UPDATE CASCADE;
