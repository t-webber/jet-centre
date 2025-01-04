/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Domains` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Domains_name_key" ON "Domains"("name");
