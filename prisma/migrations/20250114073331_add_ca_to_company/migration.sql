/*
  Warnings:

  - Added the required column `ca` to the `CompanyInfos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyInfos" ADD COLUMN     "ca" INTEGER NOT NULL;
