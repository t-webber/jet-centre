/*
  Warnings:

  - You are about to drop the column `studyId` on the `StudyInfos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[informationId]` on the table `Studies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `StudyInfos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `informationId` to the `Studies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudyInfos" DROP CONSTRAINT "StudyInfos_studyId_fkey";

-- DropIndex
DROP INDEX "StudyInfos_studyId_key";

-- AlterTable
ALTER TABLE "Studies" ADD COLUMN     "informationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudyInfos" DROP COLUMN "studyId";

-- CreateIndex
CREATE UNIQUE INDEX "Studies_informationId_key" ON "Studies"("informationId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyInfos_title_key" ON "StudyInfos"("title");

-- AddForeignKey
ALTER TABLE "Studies" ADD CONSTRAINT "Studies_informationId_fkey" FOREIGN KEY ("informationId") REFERENCES "StudyInfos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
