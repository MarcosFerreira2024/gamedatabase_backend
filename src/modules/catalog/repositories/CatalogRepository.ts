import { injectable } from "tsyringe";
import { GameData } from "../interfaces/GameData";
import { ICatalogRepository } from "../interfaces/ICatalogRepository";
import prisma from "../../../libs/prisma/prisma-client";

@injectable()
export class CatalogRepository implements ICatalogRepository {
  constructor() {}

  async getOneById(id: number) {
    return await prisma.game.findUnique({
      where: { igdbId: id },
      select: {
        name: true,
        cover: true,
        first_release_date: true,
        url: true,
        videos: true,
        platforms: true,
      },
    });
  }

  async getAll() {
    return await prisma.game.findMany({
      include: {
        artworks: true,
        collections: true,
        developers: true,
        gameEngines: true,
        franchises: true,
        genres: true,
        platforms: true,
        modes: true,
        screenshots: true,
        publishers: true,
        themes: true,
        videos: true,
        websites: true,
        playerPerspectives: true,
      },
      orderBy: {
        first_release_date: "desc",
        totalScore: "desc",
      },
    });
  }

  private safeArray<T>(arr?: T | T[]): T[] {
    if (!arr) return [];
    return Array.isArray(arr) ? arr : [arr];
  }

  // Para entidades com name como único (Company, Genre, Platform, etc.)
  private mapConnectOrCreateByName<T extends { id?: number; name: string }>(
    items?: T[]
  ) {
    return this.safeArray(items).map((item) => ({
      where: { name: item.name },
      create: { name: item.name },
    }));
  }

  // Para entidades com url como único (Artwork, Screenshot, Website)
  private mapConnectOrCreateByUrl<T extends { url: string }>(items?: T[]) {
    return this.safeArray(items).map((item) => ({
      where: { url: item.url },
      create: { url: item.url },
    }));
  }

  // Para videos (name + url obrigatórios)
  private mapConnectOrCreateVideos(items?: { name: string; url: string }[]) {
    return this.safeArray(items).map((item) => ({
      where: { url: item.url },
      create: { name: item.name, url: item.url },
    }));
  }

  async saveAll(games: GameData[]): Promise<void> {
    for (const gameData of games) {
      await prisma.game.upsert({
        where: { igdbId: gameData.igdbId },
        update: {
          name: gameData.name,
          summary: gameData.summary,
          storyline: gameData.storyline,
          cover: gameData.cover,
          first_release_date: gameData.first_release_date,
          criticScore: gameData.criticsScore,
          criticCount: gameData.criticsCount,
          userScore: gameData.usersScore,
          userCount: gameData.usersCount,
          totalScore: gameData.totalScore,
          totalCount: gameData.totalCount,
          updatedAt: gameData.updatedAt,
          url: gameData.url,
          // Relações
          developers: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.developers),
          },
          publishers: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.publishers),
          },
          genres: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.genres),
          },
          platforms: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.platforms),
          },
          modes: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.modes),
          },
          themes: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.themes),
          },
          playerPerspectives: {
            connectOrCreate: this.mapConnectOrCreateByName(
              gameData.playerPerspectives
            ),
          },
          artworks: {
            connectOrCreate: this.mapConnectOrCreateByUrl(gameData.artworks),
          },
          screenshots: {
            connectOrCreate: this.mapConnectOrCreateByUrl(gameData.screenshots),
          },
          videos: {
            connectOrCreate: this.mapConnectOrCreateVideos(gameData.videos),
          },
          websites: {
            connectOrCreate: this.mapConnectOrCreateByUrl(gameData.websites),
          },
          franchises: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.franchises),
          },
          collections: {
            connectOrCreate: this.mapConnectOrCreateByName(
              gameData.collections
            ),
          },
          gameEngines: {
            connectOrCreate: this.mapConnectOrCreateByName(
              gameData.gameEngines
            ),
          },
        },
        create: {
          igdbId: gameData.igdbId,
          name: gameData.name,
          summary: gameData.summary,
          storyline: gameData.storyline,
          cover: gameData.cover,
          first_release_date: gameData.first_release_date,
          criticScore: gameData.criticsScore,
          criticCount: gameData.criticsCount,
          userScore: gameData.usersScore,
          userCount: gameData.usersCount,
          totalScore: gameData.totalScore,
          totalCount: gameData.totalCount,
          createdAt: gameData.createdAt,
          updatedAt: gameData.updatedAt,
          url: gameData.url,
          // Relações
          developers: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.developers),
          },
          publishers: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.publishers),
          },
          genres: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.genres),
          },
          platforms: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.platforms),
          },
          modes: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.modes),
          },
          themes: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.themes),
          },
          playerPerspectives: {
            connectOrCreate: this.mapConnectOrCreateByName(
              gameData.playerPerspectives
            ),
          },
          artworks: {
            connectOrCreate: this.mapConnectOrCreateByUrl(gameData.artworks),
          },
          screenshots: {
            connectOrCreate: this.mapConnectOrCreateByUrl(gameData.screenshots),
          },
          videos: {
            connectOrCreate: this.mapConnectOrCreateVideos(gameData.videos),
          },
          websites: {
            connectOrCreate: this.mapConnectOrCreateByUrl(gameData.websites),
          },
          franchises: {
            connectOrCreate: this.mapConnectOrCreateByName(gameData.franchises),
          },
          collections: {
            connectOrCreate: this.mapConnectOrCreateByName(
              gameData.collections
            ),
          },
          gameEngines: {
            connectOrCreate: this.mapConnectOrCreateByName(
              gameData.gameEngines
            ),
          },
        },
      });
    }
  }
}
