-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "originalValue" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,
    "categorieId" INTEGER NOT NULL,
    CONSTRAINT "Product_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
