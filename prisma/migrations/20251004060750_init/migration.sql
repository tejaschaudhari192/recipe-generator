/*
  Warnings:

  - The primary key for the `Chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `recipes` column on the `Chat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "recipes",
ADD COLUMN     "recipes" JSONB[],
ADD CONSTRAINT "Chat_pkey" PRIMARY KEY ("id");
