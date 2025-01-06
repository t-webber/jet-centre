/*
  Warnings:

  - You are about to drop the column `referentId` on the `Studies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Studies" DROP CONSTRAINT "Studies_referentId_fkey";

-- AlterTable
ALTER TABLE "Studies" DROP COLUMN "referentId";
