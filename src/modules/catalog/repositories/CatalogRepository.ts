import { injectable, inject } from "tsyringe";
import { GameData } from "../interfaces/GameData";
import { ICatalogRepository } from "../interfaces/ICatalogRepository";
import prisma from "../../../libs/prisma/prisma-client";

@injectable()
export class CatalogRepository implements ICatalogRepository {
  constructor() {}

  async saveAll(games: GameData[]): Promise<void> {
    for (const gameData of games) {
      console.log(gameData);
      const upserted = await prisma.game.upsert({
        where: { igdbId: gameData.igdbId },
        update: {
          name: gameData.name,
          summary: gameData.description,
          storyline: gameData.storyline,
          cover: gameData.cover,
          first_release_date: gameData.releaseDate,
          criticScore: gameData.criticsScore,
          criticCount: gameData.criticsCount,
          userScore: gameData.usersScore,
          userCount: gameData.usersCount,
          totalScore: gameData.totalScore,
          totalCount: gameData.totalCount,
          updatedAt: gameData.updatedAt,
          developers: {
            connectOrCreate: (gameData.gameDevelopers || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          publishers: {
            connectOrCreate: (gameData.gamePublishers || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          genres: {
            connectOrCreate: (gameData.gameGenres || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          platforms: {
            connectOrCreate: (gameData.gamePlatforms || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          modes: {
            connectOrCreate: (gameData.gameModes || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          themes: {
            connectOrCreate: (gameData.gameThemes || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          playerPerspectives: {
            connectOrCreate: (gameData.playerPerspectives || []).map(
              (name) => ({
                where: { name },
                create: { name },
              })
            ),
          },
          artworks: {
            connectOrCreate: (gameData.artworks || []).map((url) => ({
              where: { url },
              create: { url },
            })),
          },
          screenshots: {
            connectOrCreate: (gameData.screenshots || []).map((url) => ({
              where: { url },
              create: { url },
            })),
          },
          videos: {
            connectOrCreate: (gameData.videos || []).map((url) => ({
              where: { url },
              create: { url, name: "Video" },
            })),
          },
          websites: {
            connectOrCreate: (gameData.websites || []).map((url) => ({
              where: { url },
              create: { url },
            })),
          },
          franchises: {
            connectOrCreate: (gameData.franchises || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          collections: {
            connectOrCreate: (gameData.collections || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          gameEngines: {
            connectOrCreate: (gameData.gameEngines || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          url: gameData.url,
        },
        create: {
          igdbId: gameData.igdbId,
          name: gameData.name,
          summary: gameData.description,
          storyline: gameData.storyline,
          cover: gameData.cover,
          first_release_date: gameData.releaseDate,
          criticScore: gameData.criticsScore,
          criticCount: gameData.criticsCount,
          userScore: gameData.usersScore,
          userCount: gameData.usersCount,
          totalScore: gameData.totalScore,
          totalCount: gameData.totalCount,
          updatedAt: gameData.updatedAt,
          createdAt: gameData.createdAt,
          developers: {
            connectOrCreate: (gameData.gameDevelopers || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          publishers: {
            connectOrCreate: (gameData.gamePublishers || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          genres: {
            connectOrCreate: (gameData.gameGenres || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          platforms: {
            connectOrCreate: (gameData.gamePlatforms || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          modes: {
            connectOrCreate: (gameData.gameModes || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          themes: {
            connectOrCreate: (gameData.gameThemes || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          playerPerspectives: {
            connectOrCreate: (gameData.playerPerspectives || []).map(
              (name) => ({
                where: { name },
                create: { name },
              })
            ),
          },
          artworks: {
            connectOrCreate: (gameData.artworks || []).map((url) => ({
              where: { url },
              create: { url },
            })),
          },
          screenshots: {
            connectOrCreate: (gameData.screenshots || []).map((url) => ({
              where: { url },
              create: { url },
            })),
          },
          videos: {
            connectOrCreate: (gameData.videos || []).map((url) => ({
              where: { url },
              create: { url, name: "Video" },
            })),
          },
          websites: {
            connectOrCreate: (gameData.websites || []).map((url) => ({
              where: { url },
              create: { url },
            })),
          },
          franchises: {
            connectOrCreate: (gameData.franchises || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          collections: {
            connectOrCreate: (gameData.collections || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          gameEngines: {
            connectOrCreate: (gameData.gameEngines || []).map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          url: gameData.url,
        },
      });
    }
  }
}
