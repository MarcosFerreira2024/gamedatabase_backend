/*
  Warnings:

  - You are about to drop the column `engine` on the `Game` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Franchise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PlayerPerspective" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cover" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GamePlayerPerspectives" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GamePlayerPerspectives_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GamePlayerPerspectives_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerPerspective" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameScreenshots" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameScreenshots_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameScreenshots_B_fkey" FOREIGN KEY ("B") REFERENCES "Screenshot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameWebsites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameWebsites_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameWebsites_B_fkey" FOREIGN KEY ("B") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameFranchises" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameFranchises_A_fkey" FOREIGN KEY ("A") REFERENCES "Franchise" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameFranchises_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameArtworks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameArtworks_A_fkey" FOREIGN KEY ("A") REFERENCES "Artwork" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameArtworks_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameCovers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameCovers_A_fkey" FOREIGN KEY ("A") REFERENCES "Cover" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameCovers_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "igdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "storyline" TEXT,
    "series" TEXT,
    "hypes" INTEGER,
    "popularity" REAL,
    "rating" REAL,
    "ratingCount" INTEGER,
    "aggregatedRating" REAL,
    "aggregatedRatingCount" INTEGER,
    "totalRating" REAL,
    "totalRatingCount" INTEGER,
    "releaseDate" DATETIME,
    "status" INTEGER,
    "category" INTEGER,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Game" ("description", "id", "igdbId", "name", "popularity", "rating", "ratingCount", "releaseDate", "series", "updatedAt") SELECT "description", "id", "igdbId", "name", "popularity", "rating", "ratingCount", "releaseDate", "series", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_igdbId_key" ON "Game"("igdbId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_name_key" ON "Franchise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerPerspective_name_key" ON "PlayerPerspective"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_url_key" ON "Artwork"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Screenshot_url_key" ON "Screenshot"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Website_url_key" ON "Website"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Cover_url_key" ON "Cover"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_GamePlayerPerspectives_AB_unique" ON "_GamePlayerPerspectives"("A", "B");

-- CreateIndex
CREATE INDEX "_GamePlayerPerspectives_B_index" ON "_GamePlayerPerspectives"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameScreenshots_AB_unique" ON "_GameScreenshots"("A", "B");

-- CreateIndex
CREATE INDEX "_GameScreenshots_B_index" ON "_GameScreenshots"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameWebsites_AB_unique" ON "_GameWebsites"("A", "B");

-- CreateIndex
CREATE INDEX "_GameWebsites_B_index" ON "_GameWebsites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameFranchises_AB_unique" ON "_GameFranchises"("A", "B");

-- CreateIndex
CREATE INDEX "_GameFranchises_B_index" ON "_GameFranchises"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameArtworks_AB_unique" ON "_GameArtworks"("A", "B");

-- CreateIndex
CREATE INDEX "_GameArtworks_B_index" ON "_GameArtworks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameCovers_AB_unique" ON "_GameCovers"("A", "B");

-- CreateIndex
CREATE INDEX "_GameCovers_B_index" ON "_GameCovers"("B");
