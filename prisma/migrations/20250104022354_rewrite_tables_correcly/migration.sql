/*
  Warnings:

  - You are about to drop the column `adminsId` on the `StudyInfos` table. All the data in the column will be lost.
  - You are about to drop the column `assigneeId` on the `StudyInfos` table. All the data in the column will be lost.
  - You are about to drop the column `domainId` on the `StudyInfos` table. All the data in the column will be lost.
  - You are about to drop the column `mriId` on the `StudyInfos` table. All the data in the column will be lost.
  - Added the required column `referentId` to the `Studies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cc` to the `StudyInfos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deadlinePreStudy` to the `StudyInfos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `StudyInfos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudyInfos" DROP CONSTRAINT "StudyInfos_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "StudyInfos" DROP CONSTRAINT "StudyInfos_domainId_fkey";

-- DropForeignKey
ALTER TABLE "StudyInfos" DROP CONSTRAINT "StudyInfos_mriId_fkey";

-- DropIndex
DROP INDEX "StudyInfos_assigneeId_key";

-- DropIndex
DROP INDEX "StudyInfos_mriId_key";

-- AlterTable
ALTER TABLE "Studies" ADD COLUMN     "referentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudyInfos" DROP COLUMN "adminsId",
DROP COLUMN "assigneeId",
DROP COLUMN "domainId",
DROP COLUMN "mriId",
ADD COLUMN     "cc" BOOLEAN NOT NULL,
ADD COLUMN     "deadlinePreStudy" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_DomainsToStudyInfos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DomainsToStudyInfos_AB_unique" ON "_DomainsToStudyInfos"("A", "B");

-- CreateIndex
CREATE INDEX "_DomainsToStudyInfos_B_index" ON "_DomainsToStudyInfos"("B");

-- AddForeignKey
ALTER TABLE "Studies" ADD CONSTRAINT "Studies_referentId_fkey" FOREIGN KEY ("referentId") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DomainsToStudyInfos" ADD CONSTRAINT "_DomainsToStudyInfos_A_fkey" FOREIGN KEY ("A") REFERENCES "Domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DomainsToStudyInfos" ADD CONSTRAINT "_DomainsToStudyInfos_B_fkey" FOREIGN KEY ("B") REFERENCES "StudyInfos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
