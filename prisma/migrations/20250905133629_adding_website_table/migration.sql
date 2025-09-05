-- CreateTable
CREATE TABLE "Website" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    CONSTRAINT "Website_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_url_key" ON "Website"("url");
