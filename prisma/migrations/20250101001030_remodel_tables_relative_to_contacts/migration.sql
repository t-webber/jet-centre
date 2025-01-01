/*
  Warnings:

  - You are about to drop the column `clientsId` on the `Studies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Studies" DROP CONSTRAINT "Studies_clientsId_fkey";

-- AlterTable
ALTER TABLE "Studies" DROP COLUMN "clientsId";
