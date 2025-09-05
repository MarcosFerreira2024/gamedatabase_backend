/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `Game` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "igdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT,
    "storyline" TEXT,
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
INSERT INTO "new_Game" ("cover", "createdAt", "criticCount", "criticScore", "first_release_date", "id", "igdbId", "name", "storyline", "summary", "totalCount", "totalScore", "updatedAt", "url", "userCount", "userScore") SELECT "cover", "createdAt", "criticCount", "criticScore", "first_release_date", "id", "igdbId", "name", "storyline", "summary", "totalCount", "totalScore", "updatedAt", "url", "userCount", "userScore" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_igdbId_key" ON "Game"("igdbId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
