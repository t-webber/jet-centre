/*
  Warnings:

  - Changed the type of `size` on the `CompanyInfos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('MicroEntreprise', 'PetiteEntreprise', 'MoyenneEntreprise', 'GrandeEntreprise');

-- AlterTable
ALTER TABLE "CompanyInfos" DROP COLUMN "size",
ADD COLUMN     "size" "CompanySize" NOT NULL;
