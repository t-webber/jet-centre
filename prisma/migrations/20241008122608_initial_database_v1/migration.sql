-- CreateEnum
CREATE TYPE "NotifLvl" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "StudyProgressStep" AS ENUM ('PRESTUDY', 'TRI_PARTY_MEETING', 'ASSIGNEE_PAPERS', 'IN_STUDY', 'ENDED', 'ASSIGNEE_PAID', 'COMAPNY_FACTORED');

-- CreateTable
CREATE TABLE "People" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "adress" TEXT NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "userSettingsId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pages" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "navigable" BOOLEAN NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "Pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "notifLvl" "NotifLvl" NOT NULL,
    "gui" BOOLEAN NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyClients" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "StudyClients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Satisfactions" (
    "id" TEXT NOT NULL,
    "studyClientId" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "publish" BOOLEAN NOT NULL,
    "howKnowUs" TEXT NOT NULL,
    "whyUs" TEXT NOT NULL,
    "satisfactionObjectives" INTEGER NOT NULL,
    "easyness" INTEGER NOT NULL,
    "timelaps" INTEGER NOT NULL,
    "recommendUs" INTEGER NOT NULL,

    CONSTRAINT "Satisfactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyInfos" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "nvEmployees" INTEGER NOT NULL,
    "domains" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "CompanyInfos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Docs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "googlePath" TEXT NOT NULL,
    "extention" TEXT NOT NULL,
    "editable" BOOLEAN NOT NULL,

    CONSTRAINT "Docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "docsId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "wrote" TIMESTAMP(3) NOT NULL,
    "audited" TIMESTAMP(3) NOT NULL,
    "sent" TIMESTAMP(3) NOT NULL,
    "signed" TIMESTAMP(3) NOT NULL,
    "approved" TIMESTAMP(3) NOT NULL,
    "bypasses" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MRIs" (
    "id" TEXT NOT NULL,
    "paycheck_under" INTEGER NOT NULL,
    "paycheck_over" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "introdcution" TEXT NOT NULL,
    "contect" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,

    CONSTRAINT "MRIs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignees" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,

    CONSTRAINT "Assignees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssigneeInfos" (
    "id" TEXT NOT NULL,
    "assigneeId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "promotion" INTEGER NOT NULL,
    "boursier" BOOLEAN NOT NULL,
    "oldJet" BOOLEAN NOT NULL,

    CONSTRAINT "AssigneeInfos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssigneeDocs" (
    "id" TEXT NOT NULL,
    "assigneeId" TEXT NOT NULL,
    "cniId" TEXT NOT NULL,
    "vitaleId" TEXT NOT NULL,
    "studentCardId" TEXT NOT NULL,

    CONSTRAINT "AssigneeDocs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyAssigness" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "assigneeId" TEXT NOT NULL,
    "formInterviewId" TEXT NOT NULL,
    "formMRIId" TEXT NOT NULL,
    "selection" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL,

    CONSTRAINT "StudyAssigness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormMRIs" (
    "id" TEXT NOT NULL,
    "mriId" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "knowledge" TEXT NOT NULL,
    "ideas" TEXT NOT NULL,
    "JEexprerience" INTEGER NOT NULL,

    CONSTRAINT "FormMRIs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormInterviews" (
    "id" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "approche" TEXT NOT NULL,
    "courses" TEXT NOT NULL,
    "STAR_S" TEXT NOT NULL,
    "STAR_T" TEXT NOT NULL,
    "STAR_A" TEXT NOT NULL,
    "STAR_R" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "cdpRequirements" TEXT NOT NULL,
    "questions" TEXT NOT NULL,

    CONSTRAINT "FormInterviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studies" (
    "id" TEXT NOT NULL,
    "studyProgressId" TEXT NOT NULL,
    "domainsId" TEXT,
    "clientsId" TEXT,

    CONSTRAINT "Studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyInfo" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assigneeId" TEXT NOT NULL,
    "mriId" TEXT NOT NULL,
    "applicationFee" DOUBLE PRECISION NOT NULL,
    "deliverablesId" TEXT NOT NULL,
    "adminsId" TEXT,

    CONSTRAINT "StudyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyProgress" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "step" "StudyProgressStep" NOT NULL,

    CONSTRAINT "StudyProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phases" (
    "id" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "studyProgressId" TEXT,

    CONSTRAINT "Phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JEHs" (
    "id" TEXT NOT NULL,
    "JEHnb" INTEGER NOT NULL,
    "deliverable" TEXT NOT NULL,
    "phasesId" TEXT,

    CONSTRAINT "JEHs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domains" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studyInfoId" TEXT,

    CONSTRAINT "Domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deliverables" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "given" BOOLEAN NOT NULL,
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "Deliverables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyDocs" (
    "id" TEXT NOT NULL,
    "ceId" TEXT NOT NULL,
    "ccId" TEXT NOT NULL,
    "brId" TEXT NOT NULL,
    "rmId" TEXT NOT NULL,
    "aceId" TEXT NOT NULL,
    "armId" TEXT NOT NULL,
    "accId" TEXT NOT NULL,
    "bcrcId" TEXT NOT NULL,
    "pvriId" TEXT NOT NULL,
    "pvrfId" TEXT NOT NULL,
    "bvId" TEXT NOT NULL,
    "cconfId" TEXT NOT NULL,
    "studyInfoId" TEXT,

    CONSTRAINT "StudyDocs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_cdp" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_auditor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "People_email_key" ON "People"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_peopleId_key" ON "User"("peopleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userSettingsId_key" ON "User"("userSettingsId");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_userId_key" ON "Admins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_peopleId_key" ON "Clients"("peopleId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyClients_studyId_key" ON "StudyClients"("studyId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyClients_clientId_key" ON "StudyClients"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Satisfactions_studyClientId_key" ON "Satisfactions"("studyClientId");

-- CreateIndex
CREATE UNIQUE INDEX "Satisfactions_studyId_key" ON "Satisfactions"("studyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyInfos_companyId_key" ON "CompanyInfos"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Status_docsId_key" ON "Status"("docsId");

-- CreateIndex
CREATE UNIQUE INDEX "MRIs_studyId_key" ON "MRIs"("studyId");

-- CreateIndex
CREATE UNIQUE INDEX "Assignees_peopleId_key" ON "Assignees"("peopleId");

-- CreateIndex
CREATE UNIQUE INDEX "AssigneeInfos_assigneeId_key" ON "AssigneeInfos"("assigneeId");

-- CreateIndex
CREATE UNIQUE INDEX "AssigneeDocs_cniId_key" ON "AssigneeDocs"("cniId");

-- CreateIndex
CREATE UNIQUE INDEX "AssigneeDocs_vitaleId_key" ON "AssigneeDocs"("vitaleId");

-- CreateIndex
CREATE UNIQUE INDEX "AssigneeDocs_studentCardId_key" ON "AssigneeDocs"("studentCardId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyAssigness_formInterviewId_key" ON "StudyAssigness"("formInterviewId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyAssigness_formMRIId_key" ON "StudyAssigness"("formMRIId");

-- CreateIndex
CREATE UNIQUE INDEX "FormMRIs_mriId_key" ON "FormMRIs"("mriId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyInfo_studyId_key" ON "StudyInfo"("studyId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyInfo_assigneeId_key" ON "StudyInfo"("assigneeId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyInfo_mriId_key" ON "StudyInfo"("mriId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyProgress_studyId_key" ON "StudyProgress"("studyId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_ceId_key" ON "StudyDocs"("ceId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_ccId_key" ON "StudyDocs"("ccId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_brId_key" ON "StudyDocs"("brId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_rmId_key" ON "StudyDocs"("rmId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_aceId_key" ON "StudyDocs"("aceId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_armId_key" ON "StudyDocs"("armId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_accId_key" ON "StudyDocs"("accId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_bcrcId_key" ON "StudyDocs"("bcrcId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_pvriId_key" ON "StudyDocs"("pvriId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_pvrfId_key" ON "StudyDocs"("pvrfId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_bvId_key" ON "StudyDocs"("bvId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyDocs_cconfId_key" ON "StudyDocs"("cconfId");

-- CreateIndex
CREATE UNIQUE INDEX "_cdp_AB_unique" ON "_cdp"("A", "B");

-- CreateIndex
CREATE INDEX "_cdp_B_index" ON "_cdp"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_auditor_AB_unique" ON "_auditor"("A", "B");

-- CreateIndex
CREATE INDEX "_auditor_B_index" ON "_auditor"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userSettingsId_fkey" FOREIGN KEY ("userSettingsId") REFERENCES "UserSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pages" ADD CONSTRAINT "Pages_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyClients" ADD CONSTRAINT "StudyClients_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyClients" ADD CONSTRAINT "StudyClients_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satisfactions" ADD CONSTRAINT "Satisfactions_studyClientId_fkey" FOREIGN KEY ("studyClientId") REFERENCES "StudyClients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satisfactions" ADD CONSTRAINT "Satisfactions_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyInfos" ADD CONSTRAINT "CompanyInfos_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_docsId_fkey" FOREIGN KEY ("docsId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MRIs" ADD CONSTRAINT "MRIs_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignees" ADD CONSTRAINT "Assignees_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssigneeInfos" ADD CONSTRAINT "AssigneeInfos_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "Assignees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssigneeDocs" ADD CONSTRAINT "AssigneeDocs_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "Assignees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssigneeDocs" ADD CONSTRAINT "AssigneeDocs_cniId_fkey" FOREIGN KEY ("cniId") REFERENCES "Docs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssigneeDocs" ADD CONSTRAINT "AssigneeDocs_vitaleId_fkey" FOREIGN KEY ("vitaleId") REFERENCES "Docs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssigneeDocs" ADD CONSTRAINT "AssigneeDocs_studentCardId_fkey" FOREIGN KEY ("studentCardId") REFERENCES "Docs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAssigness" ADD CONSTRAINT "StudyAssigness_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAssigness" ADD CONSTRAINT "StudyAssigness_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "Assignees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAssigness" ADD CONSTRAINT "StudyAssigness_formInterviewId_fkey" FOREIGN KEY ("formInterviewId") REFERENCES "FormInterviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAssigness" ADD CONSTRAINT "StudyAssigness_formMRIId_fkey" FOREIGN KEY ("formMRIId") REFERENCES "FormMRIs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormMRIs" ADD CONSTRAINT "FormMRIs_mriId_fkey" FOREIGN KEY ("mriId") REFERENCES "MRIs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Studies" ADD CONSTRAINT "Studies_domainsId_fkey" FOREIGN KEY ("domainsId") REFERENCES "Domains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Studies" ADD CONSTRAINT "Studies_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfo" ADD CONSTRAINT "StudyInfo_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfo" ADD CONSTRAINT "StudyInfo_deliverablesId_fkey" FOREIGN KEY ("deliverablesId") REFERENCES "Deliverables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfo" ADD CONSTRAINT "StudyInfo_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "StudyAssigness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyInfo" ADD CONSTRAINT "StudyInfo_mriId_fkey" FOREIGN KEY ("mriId") REFERENCES "MRIs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyProgress" ADD CONSTRAINT "StudyProgress_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phases" ADD CONSTRAINT "Phases_studyProgressId_fkey" FOREIGN KEY ("studyProgressId") REFERENCES "StudyProgress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JEHs" ADD CONSTRAINT "JEHs_phasesId_fkey" FOREIGN KEY ("phasesId") REFERENCES "Phases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domains" ADD CONSTRAINT "Domains_studyInfoId_fkey" FOREIGN KEY ("studyInfoId") REFERENCES "StudyInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_ceId_fkey" FOREIGN KEY ("ceId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_ccId_fkey" FOREIGN KEY ("ccId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_brId_fkey" FOREIGN KEY ("brId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_rmId_fkey" FOREIGN KEY ("rmId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_aceId_fkey" FOREIGN KEY ("aceId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_armId_fkey" FOREIGN KEY ("armId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_accId_fkey" FOREIGN KEY ("accId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_bcrcId_fkey" FOREIGN KEY ("bcrcId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_pvriId_fkey" FOREIGN KEY ("pvriId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_pvrfId_fkey" FOREIGN KEY ("pvrfId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_bvId_fkey" FOREIGN KEY ("bvId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_cconfId_fkey" FOREIGN KEY ("cconfId") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDocs" ADD CONSTRAINT "StudyDocs_studyInfoId_fkey" FOREIGN KEY ("studyInfoId") REFERENCES "StudyInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cdp" ADD CONSTRAINT "_cdp_A_fkey" FOREIGN KEY ("A") REFERENCES "Admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cdp" ADD CONSTRAINT "_cdp_B_fkey" FOREIGN KEY ("B") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_auditor" ADD CONSTRAINT "_auditor_A_fkey" FOREIGN KEY ("A") REFERENCES "Admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_auditor" ADD CONSTRAINT "_auditor_B_fkey" FOREIGN KEY ("B") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
