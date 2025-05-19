/*
  Warnings:

  - You are about to drop the column `personId` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_personId_fkey";

-- DropIndex
DROP INDEX "Address_personId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "personId";

-- CreateIndex
CREATE UNIQUE INDEX "Person_addressId_key" ON "Person"("addressId");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
