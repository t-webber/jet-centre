/*
  Warnings:

  - You are about to drop the `StudyInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudyDocs" DROP CONSTRAINT "StudyDocs_studyInfoId_fkey";

-- DropForeignKey
ALTER TABLE "StudyInfo" DROP CONSTRAINT "StudyInfo_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "StudyInfo" DROP CONSTRAINT "StudyInfo_deliverablesId_fkey";

-- DropForeignKey
ALTER TABLE "StudyInfo" DROP CONSTRAINT "StudyInfo_domainId_fkey";

-- DropForeignKey
ALTER TABLE "StudyInfo" DROP CONSTRAINT "StudyInfo_mriId_fkey";

-- DropForeignKey
ALTER TABLE "StudyInfo" DROP CONSTRAINT "StudyInfo_studyId_fkey";

-- DropTable
DROP TABLE "StudyInfo";

-- CreateTable
CREATE TABLE "StudyInfos" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "applicationFee" DOUBLE PRECISION NOT NULL,
    "domainId" TEXT,
    "deliverablesId" TEXT,
    "assigneeId" TEXT,
    "mriId" TEXT,
    "adminsId" TEXT,

    CONSTRAINT "StudyInfos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyInfos_studyId_key" ON "StudyInfos"("studyId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyInfos_assigneeId_key" ON "StudyInfos"("assigneeId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyInfos_mriId_key" ON "StudyInfos"("mriId");

-- AddForeignKey
ALTER TABLE "StudyInfos" ADD CONSTRAINT "StudyInfos_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfos" ADD CONSTRAINT "StudyInfos_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfos" ADD CONSTRAINT "StudyInfos_deliverablesId_fkey" FOREIGN KEY ("deliverablesId") REFERENCES "Deliverables"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfos" ADD CONSTRAINT "StudyInfos_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "StudyAssignees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfos" ADD CONSTRAINT "StudyInfos_mriId_fkey" FOREIGN KEY ("mriId") REFERENCES "MRIs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_studyInfoId_fkey" FOREIGN KEY ("studyInfoId") REFERENCES "StudyInfos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
