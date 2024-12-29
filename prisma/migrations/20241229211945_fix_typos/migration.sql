/*
  Warnings:

  - You are about to drop the column `easyness` on the `Satisfactions` table. All the data in the column will be lost.
  - Added the required column `easiness` to the `Satisfactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Satisfactions" DROP COLUMN "easyness",
ADD COLUMN     "easiness" INTEGER NOT NULL;
