-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "ingredients" TEXT[],
    "recipes" JSONB NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);
