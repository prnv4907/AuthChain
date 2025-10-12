/*
  Warnings:

  - You are about to drop the column `produtId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_produtId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "produtId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
