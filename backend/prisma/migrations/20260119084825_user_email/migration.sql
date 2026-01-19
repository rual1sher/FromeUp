/*
  Warnings:

  - You are about to drop the column `groupId` on the `TaskStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nickname,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."TaskStatus" DROP CONSTRAINT "TaskStatus_groupId_fkey";

-- DropIndex
DROP INDEX "public"."User_nickname_key";

-- AlterTable
ALTER TABLE "TaskStatus" DROP COLUMN "groupId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_email_key" ON "User"("nickname", "email");
