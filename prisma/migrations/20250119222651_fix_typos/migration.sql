/*
  Warnings:

  - The values [PRESTUDY,TRI_PARTY_MEETING] on the enum `StudyProgressStep` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `vitaleId` on the `AssigneeDocs` table. All the data in the column will be lost.
  - You are about to drop the column `boursier` on the `AssigneeInfos` table. All the data in the column will be lost.
  - You are about to drop the column `extention` on the `Docs` table. All the data in the column will be lost.
  - You are about to drop the column `approche` on the `FormInterviews` table. All the data in the column will be lost.
  - You are about to drop the column `JEexprerience` on the `FormMRIs` table. All the data in the column will be lost.
  - You are about to drop the column `timelaps` on the `Satisfactions` table. All the data in the column will be lost.
  - You are about to drop the column `bcrcId` on the `StudyDocs` table. All the data in the column will be lost.
  - You are about to drop the column `notifLvl` on the `UserSettings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[socialSecurityId]` on the table `AssigneeDocs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bcrId]` on the table `StudyDocs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `socialSecurityId` to the `AssigneeDocs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `asScholarship` to the `AssigneeInfos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nbApplications` to the `Assignees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extension` to the `Docs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approach` to the `FormInterviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jeExperience` to the `FormMRIs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeElapsed` to the `Satisfactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bcrId` to the `StudyDocs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notificationLvl` to the `UserSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StudyProgressStep_new" AS ENUM ('PRELIMINARY_STUDY', 'TRIPARTITE_MEETING', 'ASSIGNEE_PAPERS', 'IN_STUDY', 'ENDED', 'ASSIGNEE_PAID', 'COMPANY_FACTORED');
ALTER TABLE "StudyProgress" ALTER COLUMN "step" TYPE "StudyProgressStep_new" USING ("step"::text::"StudyProgressStep_new");
ALTER TYPE "StudyProgressStep" RENAME TO "StudyProgressStep_old";
ALTER TYPE "StudyProgressStep_new" RENAME TO "StudyProgressStep";
DROP TYPE "StudyProgressStep_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AssigneeDocs" DROP CONSTRAINT "AssigneeDocs_vitaleId_fkey";

-- DropForeignKey
ALTER TABLE "StudyDocs" DROP CONSTRAINT "StudyDocs_bcrcId_fkey";

-- DropIndex
DROP INDEX "AssigneeDocs_vitaleId_key";

-- DropIndex
DROP INDEX "StudyDocs_bcrcId_key";

-- AlterTable
ALTER TABLE "AssigneeDocs" DROP COLUMN "vitaleId",
ADD COLUMN     "socialSecurityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AssigneeInfos" DROP COLUMN "boursier",
ADD COLUMN     "asScholarship" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Assignees" ADD COLUMN     "nbApplications" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Docs" DROP COLUMN "extention",
ADD COLUMN     "extension" TEXT NOT NULL,
ADD COLUMN     "studyDocsId" TEXT;

-- AlterTable
ALTER TABLE "FormInterviews" DROP COLUMN "approche",
ADD COLUMN     "approach" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FormMRIs" DROP COLUMN "JEexprerience",
ADD COLUMN     "jeExperience" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Satisfactions" DROP COLUMN "timelaps",
ADD COLUMN     "timeElapsed" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudyDocs" DROP COLUMN "bcrcId",
ADD COLUMN     "bcrId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "notifLvl",
ADD COLUMN     "notificationLvl" "NotifLvl" NOT NULL;

-- AlterTable
ALTER TABLE "_DomainsToStudyInfos" ADD CONSTRAINT "_DomainsToStudyInfos_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_DomainsToStudyInfos_AB_unique";

-- AlterTable
ALTER TABLE "_auditor" ADD CONSTRAINT "_auditor_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_auditor_AB_unique";

-- AlterTable
ALTER TABLE "_cdp" ADD CONSTRAINT "_cdp_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_cdp_AB_unique";

-- CreateIndex
CREATE UNIQUE INDEX "AssigneeDocs_socialSecurityId_key" ON "AssigneeDocs"("socialSecurityId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_bcrId_key" ON "StudyDocs"("bcrId");

-- AddForeignKey
ALTER TABLE "Docs" ADD CONSTRAINT "Docs_studyDocsId_fkey" FOREIGN KEY ("studyDocsId") REFERENCES "StudyDocs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssigneeDocs" ADD CONSTRAINT "AssigneeDocs_socialSecurityId_fkey" FOREIGN KEY ("socialSecurityId") REFERENCES "Docs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_bcrId_fkey" FOREIGN KEY ("bcrId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
