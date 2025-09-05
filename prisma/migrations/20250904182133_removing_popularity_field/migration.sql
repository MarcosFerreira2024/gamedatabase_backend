/*
  Warnings:

  - You are about to drop the column `popularity` on the `Game` table. All the data in the column will be lost.

*/
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
INSERT INTO "new_Game" ("aggregatedRating", "aggregatedRatingCount", "category", "description", "hypes", "id", "igdbId", "name", "rating", "ratingCount", "releaseDate", "series", "status", "storyline", "totalRating", "totalRatingCount", "updatedAt") SELECT "aggregatedRating", "aggregatedRatingCount", "category", "description", "hypes", "id", "igdbId", "name", "rating", "ratingCount", "releaseDate", "series", "status", "storyline", "totalRating", "totalRatingCount", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_igdbId_key" ON "Game"("igdbId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
