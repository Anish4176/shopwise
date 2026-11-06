/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emails]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emails` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_name_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "emails" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_emails_key" ON "User"("emails");
