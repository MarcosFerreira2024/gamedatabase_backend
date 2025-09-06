import { injectable } from "tsyringe";
import { ICatalogRepository } from "../interfaces/ICatalogRepository";
import prisma from "../../../libs/prisma/prisma-client";
import { Game } from "../../../generated/prisma";

@injectable()
export class CatalogRepository implements ICatalogRepository {
  constructor() {}

  async getOneById(id: number): Promise<Game | null> {
    return await prisma.game.findUnique({
      where: { igdbId: id },
      include: {
        franchises: true,
        artworks: true,
        collections: true,
        developers: true,
        gameEngines: true,
        genres: true,
        modes: true,
        platforms: true,
        publishers: true,
        playerPerspectives: true,
        screenshots: true,
        themes: true,
        videos: true,
        websites: true,
      },
    });
  }

  async getByQuery(
    searchParams: SearchParams,
    sortParams: SortParams,
    take: Take,
    offset: number
  ): Promise<FilteredGames[] | FilteredGames | []> {
    return await prisma.game.findMany({
      where: {
        ...(searchParams.name && { name: { contains: searchParams.name } }),
        ...(searchParams.genres && {
          genres: {
            some: {
              name: {
                contains: searchParams.genres,
              },
            },
          },
        }),
        ...(searchParams.platforms && {
          platforms: {
            some: {
              name: {
                contains: searchParams.platforms,
              },
            },
          },
        }),
        ...(searchParams.summary && {
          summary: { contains: searchParams.summary },
        }),
        ...(searchParams.franchises && {
          franchises: {
            some: {
              name: {
                contains: searchParams.franchises,
              },
            },
          },
        }),
        ...(searchParams.modes && {
          modes: {
            some: {
              name: {
                contains: searchParams.modes,
              },
            },
          },
        }),
        ...(searchParams.developers && {
          developers: {
            some: {
              name: {
                contains: searchParams.developers,
              },
            },
          },
        }),
        ...(searchParams.publishers && {
          publishers: {
            some: {
              name: {
                contains: searchParams.publishers,
              },
            },
          },
        }),
        ...(searchParams.usersScore && {
          usersScore: { contains: searchParams.usersScore },
        }),
        ...(searchParams.themes && {
          themes: {
            some: {
              name: {
                contains: searchParams.themes,
              },
            },
          },
        }),
        ...(searchParams.playerPerspectives && {
          playerPerspectives: {
            some: {
              name: {
                contains: searchParams.playerPerspectives,
              },
            },
          },
        }),
        ...(searchParams.first_release_date && {
          first_release_date: { equals: searchParams.first_release_date },
        }),
        ...(searchParams.gameEngines && {
          gameEngines: {
            some: {
              name: {
                contains: searchParams.gameEngines,
              },
            },
          },
        }),
        ...(searchParams.collections && {
          collections: {
            some: {
              name: {
                contains: searchParams.collections,
              },
            },
          },
        }),
      },

      orderBy: sortParams?.sortBy
        ? { [sortParams.sortBy]: sortParams.order ?? "asc" }
        : undefined,

      take,
      skip: offset,

      select: {
        cover: true,
        name: true,
        igdbId: true,
        screenshots: true,
        videos: true,
        url: true,
      },
    });
  }

  async getAll(): Promise<Game[]> {
    const game = await prisma.game.findMany({
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
        totalScore: "desc",
        first_release_date: "desc",
      },
    });
    return game;
  }

  private safeArray<T>(arr?: T | T[]): T[] {
    if (!arr) return [];
    return Array.isArray(arr) ? arr : [arr];
  }

  private mapConnectOrCreateByName<T extends { id?: number; name: string }>(
    items?: T[]
  ) {
    return this.safeArray(items).map((item) => ({
      where: { name: item.name },
      create: { name: item.name },
    }));
  }

  private mapConnectOrCreateByUrl<T extends { url: string }>(items?: T[]) {
    return this.safeArray(items).map((item) => ({
      where: { url: item.url },
      create: { url: item.url },
    }));
  }

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
