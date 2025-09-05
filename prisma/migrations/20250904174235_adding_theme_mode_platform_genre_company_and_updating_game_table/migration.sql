/*
  Warnings:

  - You are about to drop the column `genres` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `platforms` on the `Game` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Platform" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GameGenres" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GamePlatforms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GamePlatforms_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GamePlatforms_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameModes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameModes_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameModes_B_fkey" FOREIGN KEY ("B") REFERENCES "Mode" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameThemes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameThemes_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameThemes_B_fkey" FOREIGN KEY ("B") REFERENCES "Theme" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameDevelopers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameDevelopers_A_fkey" FOREIGN KEY ("A") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameDevelopers_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GamePublishers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GamePublishers_A_fkey" FOREIGN KEY ("A") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GamePublishers_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "igdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "series" TEXT,
    "engine" TEXT,
    "releaseDate" DATETIME,
    "rating" REAL,
    "ratingCount" INTEGER,
    "popularity" REAL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Game" ("description", "id", "igdbId", "name", "releaseDate") SELECT "description", "id", "igdbId", "name", "releaseDate" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_igdbId_key" ON "Game"("igdbId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_name_key" ON "Platform"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mode_name_key" ON "Mode"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GameGenres_AB_unique" ON "_GameGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_GameGenres_B_index" ON "_GameGenres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamePlatforms_AB_unique" ON "_GamePlatforms"("A", "B");

-- CreateIndex
CREATE INDEX "_GamePlatforms_B_index" ON "_GamePlatforms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameModes_AB_unique" ON "_GameModes"("A", "B");

-- CreateIndex
CREATE INDEX "_GameModes_B_index" ON "_GameModes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameThemes_AB_unique" ON "_GameThemes"("A", "B");

-- CreateIndex
CREATE INDEX "_GameThemes_B_index" ON "_GameThemes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameDevelopers_AB_unique" ON "_GameDevelopers"("A", "B");

-- CreateIndex
CREATE INDEX "_GameDevelopers_B_index" ON "_GameDevelopers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamePublishers_AB_unique" ON "_GamePublishers"("A", "B");

-- CreateIndex
CREATE INDEX "_GamePublishers_B_index" ON "_GamePublishers"("B");
