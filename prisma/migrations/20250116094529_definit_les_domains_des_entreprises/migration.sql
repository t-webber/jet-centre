/*
  Warnings:

  - The `domains` column on the `CompanyInfos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('DataScience', 'MachineLearning', 'IntelligenceArtificielle', 'DeveloppementWeb', 'DeveloppementMobile', 'DeveloppementLogiciel', 'CyberSecurite', 'Cryptographie', 'SystemesEmbarques', 'InternetDesObjets', 'Reseaux', 'Telecommunications', 'Internet', 'Image', 'ComputerGraphics', 'd_3D', 'EtudeDeMarche', 'EtatDeLArt');

-- AlterTable
ALTER TABLE "CompanyInfos" DROP COLUMN "domains",
ADD COLUMN     "domains" "Domain"[];
