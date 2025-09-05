/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "igdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "genres" TEXT,
    "releaseDate" DATETIME,
    "platforms" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "_UserFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserWishlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_igdbId_key" ON "Game"("igdbId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavorites_AB_unique" ON "_UserFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavorites_B_index" ON "_UserFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserWishlist_AB_unique" ON "_UserWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_UserWishlist_B_index" ON "_UserWishlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
