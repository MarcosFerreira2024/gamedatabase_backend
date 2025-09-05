/*
  Warnings:

  - You are about to drop the `Website` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameArtworks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameScreenshots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameWebsites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `aggregatedRating` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `aggregatedRatingCount` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `hypes` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `totalRating` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `totalRatingCount` on the `Game` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Screenshot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Website_url_key";

-- DropIndex
DROP INDEX "_GameArtworks_B_index";

-- DropIndex
DROP INDEX "_GameArtworks_AB_unique";

-- DropIndex
DROP INDEX "_GameScreenshots_B_index";

-- DropIndex
DROP INDEX "_GameScreenshots_AB_unique";

-- DropIndex
DROP INDEX "_GameWebsites_B_index";

-- DropIndex
DROP INDEX "_GameWebsites_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Website";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GameArtworks";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GameScreenshots";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GameWebsites";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    CONSTRAINT "Video_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameEngine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GameEngines" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameEngines_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameEngines_B_fkey" FOREIGN KEY ("B") REFERENCES "GameEngine" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameCollections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameCollections_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameCollections_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artwork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    CONSTRAINT "Artwork_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Artwork" ("id", "url") SELECT "id", "url" FROM "Artwork";
DROP TABLE "Artwork";
ALTER TABLE "new_Artwork" RENAME TO "Artwork";
CREATE UNIQUE INDEX "Artwork_url_key" ON "Artwork"("url");
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "igdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT,
    "storyline" TEXT,
    "series" TEXT,
    "releaseDate" DATETIME,
    "cover" TEXT,
    "first_release_date" DATETIME,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "criticScore" INTEGER,
    "criticCount" INTEGER,
    "userScore" INTEGER,
    "userCount" INTEGER,
    "totalScore" INTEGER,
    "totalCount" INTEGER
);
INSERT INTO "new_Game" ("cover", "id", "igdbId", "name", "releaseDate", "series", "storyline", "updatedAt") SELECT "cover", "id", "igdbId", "name", "releaseDate", "series", "storyline", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_igdbId_key" ON "Game"("igdbId");
CREATE TABLE "new_Screenshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    CONSTRAINT "Screenshot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Screenshot" ("id", "url") SELECT "id", "url" FROM "Screenshot";
DROP TABLE "Screenshot";
ALTER TABLE "new_Screenshot" RENAME TO "Screenshot";
CREATE UNIQUE INDEX "Screenshot_url_key" ON "Screenshot"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Video_url_key" ON "Video"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GameEngine_name_key" ON "GameEngine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GameEngines_AB_unique" ON "_GameEngines"("A", "B");

-- CreateIndex
CREATE INDEX "_GameEngines_B_index" ON "_GameEngines"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameCollections_AB_unique" ON "_GameCollections"("A", "B");

-- CreateIndex
CREATE INDEX "_GameCollections_B_index" ON "_GameCollections"("B");
