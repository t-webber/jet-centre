/*
  Warnings:

  - The values [COMAPNY_FACTORED] on the enum `StudyProgressStep` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `contect` on the `MRIs` table. All the data in the column will be lost.
  - You are about to drop the column `introdcution` on the `MRIs` table. All the data in the column will be lost.
  - You are about to drop the `StudyAssigness` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contact` to the `MRIs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `MRIs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StudyProgressStep_new" AS ENUM ('PRESTUDY', 'TRI_PARTY_MEETING', 'ASSIGNEE_PAPERS', 'IN_STUDY', 'ENDED', 'ASSIGNEE_PAID', 'COMPANY_FACTORED');
ALTER TABLE "StudyProgress" ALTER COLUMN "step" TYPE "StudyProgressStep_new" USING ("step"::text::"StudyProgressStep_new");
ALTER TYPE "StudyProgressStep" RENAME TO "StudyProgressStep_old";
ALTER TYPE "StudyProgressStep_new" RENAME TO "StudyProgressStep";
DROP TYPE "StudyProgressStep_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "StudyAssigness" DROP CONSTRAINT "StudyAssigness_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "StudyAssigness" DROP CONSTRAINT "StudyAssigness_formInterviewId_fkey";

-- DropForeignKey
ALTER TABLE "StudyAssigness" DROP CONSTRAINT "StudyAssigness_formMRIId_fkey";

-- DropForeignKey
ALTER TABLE "StudyAssigness" DROP CONSTRAINT "StudyAssigness_studyId_fkey";

-- DropForeignKey
ALTER TABLE "StudyInfo" DROP CONSTRAINT "StudyInfo_assigneeId_fkey";

-- AlterTable
ALTER TABLE "MRIs" DROP COLUMN "contect",
DROP COLUMN "introdcution",
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "introduction" TEXT NOT NULL;

-- DropTable
DROP TABLE "StudyAssigness";

-- CreateTable
CREATE TABLE "StudyAssignees" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "assigneeId" TEXT NOT NULL,
    "formInterviewId" TEXT NOT NULL,
    "formMRIId" TEXT NOT NULL,
    "selection" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL,

    CONSTRAINT "StudyAssignees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyAssignees_formInterviewId_key" ON "StudyAssignees"("formInterviewId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyAssignees_formMRIId_key" ON "StudyAssignees"("formMRIId");

-- AddForeignKey
ALTER TABLE "StudyAssignees" ADD CONSTRAINT "StudyAssignees_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAssignees" ADD CONSTRAINT "StudyAssignees_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "Assignees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAssignees" ADD CONSTRAINT "StudyAssignees_formInterviewId_fkey" FOREIGN KEY ("formInterviewId") REFERENCES "FormInterviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAssignees" ADD CONSTRAINT "StudyAssignees_formMRIId_fkey" FOREIGN KEY ("formMRIId") REFERENCES "FormMRIs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfo" ADD CONSTRAINT "StudyInfo_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "StudyAssignees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
