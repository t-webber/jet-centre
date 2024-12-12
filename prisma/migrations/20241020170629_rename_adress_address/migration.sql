/*
  Warnings:

  - You are about to drop the column `adress` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `People` table. All the data in the column will be lost.
  - Added the required column `address` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `People` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "People" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;
