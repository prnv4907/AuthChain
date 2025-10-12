-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "solAccount" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "modelNo" TEXT NOT NULL,
    "pdaAccount" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_solAccount_key" ON "User"("solAccount");

-- CreateIndex
CREATE UNIQUE INDEX "Product_modelNo_key" ON "Product"("modelNo");

-- CreateIndex
CREATE UNIQUE INDEX "Product_pdaAccount_key" ON "Product"("pdaAccount");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
