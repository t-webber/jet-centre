-- DropForeignKey
ALTER TABLE "StudyInfo" DROP CONSTRAINT "StudyInfo_deliverablesId_fkey";

-- DropForeignKey
ALTER TABLE "StudyInfo" DROP CONSTRAINT "StudyInfo_mriId_fkey";

-- AlterTable
ALTER TABLE "StudyInfo" ALTER COLUMN "assigneeId" DROP NOT NULL,
ALTER COLUMN "mriId" DROP NOT NULL,
ALTER COLUMN "deliverablesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudyInfo" ADD CONSTRAINT "StudyInfo_deliverablesId_fkey" FOREIGN KEY ("deliverablesId") REFERENCES "Deliverables"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfo" ADD CONSTRAINT "StudyInfo_mriId_fkey" FOREIGN KEY ("mriId") REFERENCES "MRIs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
