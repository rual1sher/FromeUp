/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nickname` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupId` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_groupId_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "groupId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_nickname_key" ON "Group"("nickname");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
