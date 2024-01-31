-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "LocationPreferenceENUM" AS ENUM ('REMOTE', 'ONSITE', 'BOTH');

-- CreateEnum
CREATE TYPE "EmploymentTypeENUM" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- CreateEnum
CREATE TYPE "MinimumQualification" AS ENUM ('HIGH_SCHOOL', 'ASSOCIATE', 'BACHELOR', 'MASTER', 'DOCTORATE', 'NONE');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('FIXED', 'RANGE');

-- CreateEnum
CREATE TYPE "SalaryInterval" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'USD', 'GBP', 'INR', 'AUD', 'CAD', 'SGD', 'JPY');

-- CreateEnum
CREATE TYPE "IndustryENUM" AS ENUM ('Software_Development', 'Medical_and_Healthcare', 'Financial_Services', 'Retail_and_Ecommerce', 'Manufacturing', 'Education_and_Training', 'Information_Technology', 'Real_Estate', 'Animation_and_Graphic_Design', 'Event_Planning_and_Services', 'Insurance', 'Architecture_and_Planning', 'Renewable_Energy', 'Biotechnology', 'Art_and_Crafts');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://source.unsplash.com/random/200x200?sig=1',
    "designation" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "permissions" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "industry" "IndustryENUM" NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationPreference" "LocationPreferenceENUM" NOT NULL,
    "type" TEXT NOT NULL,
    "employmentType" "EmploymentTypeENUM" NOT NULL,
    "experienceLevel" "ExperienceLevel" NOT NULL,
    "minimumQualification" "MinimumQualification" NOT NULL,
    "visaSponsorship" BOOLEAN NOT NULL,
    "salaryType" "SalaryType" NOT NULL,
    "salaryMin" INTEGER NOT NULL,
    "salaryMax" INTEGER NOT NULL,
    "salaryCurrency" "Currency" NOT NULL,
    "salaryInterval" "SalaryInterval" NOT NULL,
    "facilities" TEXT[],
    "description" TEXT NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplicantQuestions" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "options" TEXT[],
    "required" BOOLEAN NOT NULL,

    CONSTRAINT "JobApplicantQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobFAQ" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "JobFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "JobApplicantQuestions" ADD CONSTRAINT "JobApplicantQuestions_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobFAQ" ADD CONSTRAINT "JobFAQ_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
