/*
  Warnings:

  - You are about to drop the column `solAccount` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_solAccount_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "solAccount";
