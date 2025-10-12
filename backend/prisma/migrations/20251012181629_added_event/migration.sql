-- AlterTable
ALTER TABLE "User" ADD COLUMN     "account" TEXT;

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "fromAccount" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "toAccount" TEXT NOT NULL,
    "produtId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_produtId_fkey" FOREIGN KEY ("produtId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
