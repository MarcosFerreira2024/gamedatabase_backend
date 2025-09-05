/*
  Warnings:

  - You are about to drop the `Cover` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameCovers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN "cover" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cover";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GameCovers";
PRAGMA foreign_keys=on;
