/*
  Warnings:

  - The primary key for the `Artwork` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `gameId` on the `Artwork` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Artwork` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Collection` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Franchise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Franchise` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `GameEngine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `GameEngine` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Genre` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Mode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Mode` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Platform` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Platform` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `PlayerPerspective` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PlayerPerspective` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Screenshot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `gameId` on the `Screenshot` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Screenshot` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Theme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Theme` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `gameId` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `gameId` on the `Website` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GameCollections` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GameCollections` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GameDevelopers` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GameDevelopers` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GameEngines` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GameEngines` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GameFranchises` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GameFranchises` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GameGenres` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GameGenres` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GameModes` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GameModes` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GamePlatforms` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GamePlatforms` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GamePlayerPerspectives` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GamePlayerPerspectives` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GamePublishers` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GamePublishers` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_GameThemes` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_GameThemes` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_UserFavorites` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_UserFavorites` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_UserWishlist` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_UserWishlist` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artwork" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "Artwork_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Artwork" ("gameId", "id", "url") SELECT "gameId", "id", "url" FROM "Artwork";
DROP TABLE "Artwork";
ALTER TABLE "new_Artwork" RENAME TO "Artwork";
CREATE UNIQUE INDEX "Artwork_url_key" ON "Artwork"("url");
CREATE TABLE "new_Collection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Collection" ("id", "name") SELECT "id", "name" FROM "Collection";
DROP TABLE "Collection";
ALTER TABLE "new_Collection" RENAME TO "Collection";
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");
CREATE TABLE "new_Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Company" ("id", "name") SELECT "id", "name" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
CREATE TABLE "new_Franchise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Franchise" ("id", "name") SELECT "id", "name" FROM "Franchise";
DROP TABLE "Franchise";
ALTER TABLE "new_Franchise" RENAME TO "Franchise";
CREATE UNIQUE INDEX "Franchise_name_key" ON "Franchise"("name");
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_Game" ("cover", "createdAt", "criticCount", "criticScore", "first_release_date", "id", "igdbId", "name", "releaseDate", "series", "storyline", "summary", "totalCount", "totalScore", "updatedAt", "url", "userCount", "userScore") SELECT "cover", "createdAt", "criticCount", "criticScore", "first_release_date", "id", "igdbId", "name", "releaseDate", "series", "storyline", "summary", "totalCount", "totalScore", "updatedAt", "url", "userCount", "userScore" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_igdbId_key" ON "Game"("igdbId");
CREATE TABLE "new_GameEngine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_GameEngine" ("id", "name") SELECT "id", "name" FROM "GameEngine";
DROP TABLE "GameEngine";
ALTER TABLE "new_GameEngine" RENAME TO "GameEngine";
CREATE UNIQUE INDEX "GameEngine_name_key" ON "GameEngine"("name");
CREATE TABLE "new_Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Genre" ("id", "name") SELECT "id", "name" FROM "Genre";
DROP TABLE "Genre";
ALTER TABLE "new_Genre" RENAME TO "Genre";
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");
CREATE TABLE "new_Mode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Mode" ("id", "name") SELECT "id", "name" FROM "Mode";
DROP TABLE "Mode";
ALTER TABLE "new_Mode" RENAME TO "Mode";
CREATE UNIQUE INDEX "Mode_name_key" ON "Mode"("name");
CREATE TABLE "new_Platform" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Platform" ("id", "name") SELECT "id", "name" FROM "Platform";
DROP TABLE "Platform";
ALTER TABLE "new_Platform" RENAME TO "Platform";
CREATE UNIQUE INDEX "Platform_name_key" ON "Platform"("name");
CREATE TABLE "new_PlayerPerspective" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_PlayerPerspective" ("id", "name") SELECT "id", "name" FROM "PlayerPerspective";
DROP TABLE "PlayerPerspective";
ALTER TABLE "new_PlayerPerspective" RENAME TO "PlayerPerspective";
CREATE UNIQUE INDEX "PlayerPerspective_name_key" ON "PlayerPerspective"("name");
CREATE TABLE "new_Screenshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "Screenshot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Screenshot" ("gameId", "id", "url") SELECT "gameId", "id", "url" FROM "Screenshot";
DROP TABLE "Screenshot";
ALTER TABLE "new_Screenshot" RENAME TO "Screenshot";
CREATE UNIQUE INDEX "Screenshot_url_key" ON "Screenshot"("url");
CREATE TABLE "new_Theme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Theme" ("id", "name") SELECT "id", "name" FROM "Theme";
DROP TABLE "Theme";
ALTER TABLE "new_Theme" RENAME TO "Theme";
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password") SELECT "email", "id", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "Video_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("gameId", "id", "name", "url") SELECT "gameId", "id", "name", "url" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_url_key" ON "Video"("url");
CREATE TABLE "new_Website" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "Website_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Website" ("gameId", "id", "url") SELECT "gameId", "id", "url" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
CREATE UNIQUE INDEX "Website_url_key" ON "Website"("url");
CREATE TABLE "new__GameCollections" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GameCollections_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameCollections_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GameCollections" ("A", "B") SELECT "A", "B" FROM "_GameCollections";
DROP TABLE "_GameCollections";
ALTER TABLE "new__GameCollections" RENAME TO "_GameCollections";
CREATE UNIQUE INDEX "_GameCollections_AB_unique" ON "_GameCollections"("A", "B");
CREATE INDEX "_GameCollections_B_index" ON "_GameCollections"("B");
CREATE TABLE "new__GameDevelopers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GameDevelopers_A_fkey" FOREIGN KEY ("A") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameDevelopers_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GameDevelopers" ("A", "B") SELECT "A", "B" FROM "_GameDevelopers";
DROP TABLE "_GameDevelopers";
ALTER TABLE "new__GameDevelopers" RENAME TO "_GameDevelopers";
CREATE UNIQUE INDEX "_GameDevelopers_AB_unique" ON "_GameDevelopers"("A", "B");
CREATE INDEX "_GameDevelopers_B_index" ON "_GameDevelopers"("B");
CREATE TABLE "new__GameEngines" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GameEngines_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameEngines_B_fkey" FOREIGN KEY ("B") REFERENCES "GameEngine" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GameEngines" ("A", "B") SELECT "A", "B" FROM "_GameEngines";
DROP TABLE "_GameEngines";
ALTER TABLE "new__GameEngines" RENAME TO "_GameEngines";
CREATE UNIQUE INDEX "_GameEngines_AB_unique" ON "_GameEngines"("A", "B");
CREATE INDEX "_GameEngines_B_index" ON "_GameEngines"("B");
CREATE TABLE "new__GameFranchises" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GameFranchises_A_fkey" FOREIGN KEY ("A") REFERENCES "Franchise" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameFranchises_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GameFranchises" ("A", "B") SELECT "A", "B" FROM "_GameFranchises";
DROP TABLE "_GameFranchises";
ALTER TABLE "new__GameFranchises" RENAME TO "_GameFranchises";
CREATE UNIQUE INDEX "_GameFranchises_AB_unique" ON "_GameFranchises"("A", "B");
CREATE INDEX "_GameFranchises_B_index" ON "_GameFranchises"("B");
CREATE TABLE "new__GameGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GameGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GameGenres" ("A", "B") SELECT "A", "B" FROM "_GameGenres";
DROP TABLE "_GameGenres";
ALTER TABLE "new__GameGenres" RENAME TO "_GameGenres";
CREATE UNIQUE INDEX "_GameGenres_AB_unique" ON "_GameGenres"("A", "B");
CREATE INDEX "_GameGenres_B_index" ON "_GameGenres"("B");
CREATE TABLE "new__GameModes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GameModes_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameModes_B_fkey" FOREIGN KEY ("B") REFERENCES "Mode" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GameModes" ("A", "B") SELECT "A", "B" FROM "_GameModes";
DROP TABLE "_GameModes";
ALTER TABLE "new__GameModes" RENAME TO "_GameModes";
CREATE UNIQUE INDEX "_GameModes_AB_unique" ON "_GameModes"("A", "B");
CREATE INDEX "_GameModes_B_index" ON "_GameModes"("B");
CREATE TABLE "new__GamePlatforms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GamePlatforms_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GamePlatforms_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GamePlatforms" ("A", "B") SELECT "A", "B" FROM "_GamePlatforms";
DROP TABLE "_GamePlatforms";
ALTER TABLE "new__GamePlatforms" RENAME TO "_GamePlatforms";
CREATE UNIQUE INDEX "_GamePlatforms_AB_unique" ON "_GamePlatforms"("A", "B");
CREATE INDEX "_GamePlatforms_B_index" ON "_GamePlatforms"("B");
CREATE TABLE "new__GamePlayerPerspectives" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GamePlayerPerspectives_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GamePlayerPerspectives_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerPerspective" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GamePlayerPerspectives" ("A", "B") SELECT "A", "B" FROM "_GamePlayerPerspectives";
DROP TABLE "_GamePlayerPerspectives";
ALTER TABLE "new__GamePlayerPerspectives" RENAME TO "_GamePlayerPerspectives";
CREATE UNIQUE INDEX "_GamePlayerPerspectives_AB_unique" ON "_GamePlayerPerspectives"("A", "B");
CREATE INDEX "_GamePlayerPerspectives_B_index" ON "_GamePlayerPerspectives"("B");
CREATE TABLE "new__GamePublishers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GamePublishers_A_fkey" FOREIGN KEY ("A") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GamePublishers_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GamePublishers" ("A", "B") SELECT "A", "B" FROM "_GamePublishers";
DROP TABLE "_GamePublishers";
ALTER TABLE "new__GamePublishers" RENAME TO "_GamePublishers";
CREATE UNIQUE INDEX "_GamePublishers_AB_unique" ON "_GamePublishers"("A", "B");
CREATE INDEX "_GamePublishers_B_index" ON "_GamePublishers"("B");
CREATE TABLE "new__GameThemes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GameThemes_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameThemes_B_fkey" FOREIGN KEY ("B") REFERENCES "Theme" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GameThemes" ("A", "B") SELECT "A", "B" FROM "_GameThemes";
DROP TABLE "_GameThemes";
ALTER TABLE "new__GameThemes" RENAME TO "_GameThemes";
CREATE UNIQUE INDEX "_GameThemes_AB_unique" ON "_GameThemes"("A", "B");
CREATE INDEX "_GameThemes_B_index" ON "_GameThemes"("B");
CREATE TABLE "new__UserFavorites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__UserFavorites" ("A", "B") SELECT "A", "B" FROM "_UserFavorites";
DROP TABLE "_UserFavorites";
ALTER TABLE "new__UserFavorites" RENAME TO "_UserFavorites";
CREATE UNIQUE INDEX "_UserFavorites_AB_unique" ON "_UserFavorites"("A", "B");
CREATE INDEX "_UserFavorites_B_index" ON "_UserFavorites"("B");
CREATE TABLE "new__UserWishlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__UserWishlist" ("A", "B") SELECT "A", "B" FROM "_UserWishlist";
DROP TABLE "_UserWishlist";
ALTER TABLE "new__UserWishlist" RENAME TO "_UserWishlist";
CREATE UNIQUE INDEX "_UserWishlist_AB_unique" ON "_UserWishlist"("A", "B");
CREATE INDEX "_UserWishlist_B_index" ON "_UserWishlist"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
