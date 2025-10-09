-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_userId_key" ON "Ingredient"("name", "userId");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
