-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'recruiter');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileImg" VARCHAR(1000),
    "accountVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationCode" TEXT,
    "resetLink" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'recruiter',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
