import { injectable, inject } from "tsyringe";
import { IGDBApiClient } from "./IGDBClientApi";

@injectable()
class IGDBGameMapper {
  constructor(@inject("IGDBApiClient") private client: IGDBApiClient) {}

  private ensureArray<T>(data?: T | T[]): T[] {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }

  private async fetchItemsByIds(
    endpoint: string,
    ids?: number[]
  ): Promise<{ id: number; name: string }[]> {
    if (!ids?.length) return [];
    const items = this.ensureArray(
      await this.client.fetch(endpoint, ids, ["id", "name"])
    );
    return items
      .filter((item: any) => item?.id && item?.name)
      .map((item: any) => ({ id: item.id, name: item.name }));
  }

  private buildImageUrl(
    imageId?: string,
    size: string = "1080p"
  ): string | null {
    return imageId
      ? `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`
      : null;
  }

  async getGameWithResolvedData(gameId: number): Promise<GameData | null> {
    const games = this.ensureArray(
      await this.client.fetch(
        "games",
        [gameId],
        [
          "id",
          "name",
          "genres",
          "platforms",
          "cover",
          "artworks",
          "screenshots",
          "videos",
          "involved_companies",
          "game_modes",
          "themes",
          "player_perspectives",
          "summary",
          "storyline",
          "first_release_date",
          "collections",
          "franchises",
          "game_engines",
          "created_at",
          "updated_at",
          "slug",
          "aggregated_rating",
          "aggregated_rating_count",
          "rating",
          "rating_count",
          "total_rating",
          "total_rating_count",
          "websites",
        ]
      )
    );

    const game = games[0];
    if (!game) return null;

    const [coverData, artworksData, screenshotsData] = await Promise.all([
      game.cover
        ? this.ensureArray(
            await this.client.fetch("covers", [game.cover], ["image_id"])
          )
        : [],
      game.artworks?.length
        ? this.ensureArray(
            await this.client.fetch("artworks", game.artworks, ["image_id"])
          )
        : [],
      game.screenshots?.length
        ? this.ensureArray(
            await this.client.fetch("screenshots", game.screenshots, [
              "image_id",
            ])
          )
        : [],
    ]);

    const coverUrl =
      this.buildImageUrl(coverData[0]?.image_id) ||
      "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png";

    const artworks = artworksData.map((a, i) => ({
      id: i,
      gameId: game.id,
      url: this.buildImageUrl(a.image_id)!,
    }));

    const screenshots = screenshotsData.map((s, i) => ({
      id: i,
      gameId: game.id,
      url: this.buildImageUrl(s.image_id)!,
    }));

    const [
      genres,
      platforms,
      modes,
      themes,

      playerPerspectives,
      collections,
      franchises,
      gameEngines,
    ] = await Promise.all([
      this.fetchItemsByIds("genres", game.genres),
      this.fetchItemsByIds("platforms", game.platforms),
      this.fetchItemsByIds("game_modes", game.game_modes),
      this.fetchItemsByIds("themes", game.themes),
      this.fetchItemsByIds("player_perspectives", game.player_perspectives),
      this.fetchItemsByIds("collections", game.collections),
      this.fetchItemsByIds("franchises", game.franchises),
      this.fetchItemsByIds("game_engines", game.game_engines),
    ]);

    const companiesData = game.involved_companies?.length
      ? this.ensureArray(
          await this.client.fetch(
            "involved_companies",
            game.involved_companies,
            ["company", "developer", "publisher"]
          )
        )
      : [];
    const companyIds = companiesData.map((c) => c.company).filter(Boolean);
    const companiesInfo = companyIds.length
      ? this.ensureArray(
          await this.client.fetch("companies", companyIds, ["id", "name"])
        )
      : [];

    const developers = companiesData
      .filter((c) => c.developer)
      .map((c) => {
        const comp = companiesInfo.find((ci) => ci.id === c.company);
        return comp ? { id: comp.id, name: comp.name } : null;
      })
      .filter(Boolean) as { id: number; name: string }[];

    const publishers = companiesData
      .filter((c) => c.publisher)
      .map((c) => {
        const comp = companiesInfo.find((ci) => ci.id === c.company);
        return comp ? { id: comp.id, name: comp.name } : null;
      })
      .filter(Boolean) as { id: number; name: string }[];

    const videosData = game.videos?.length
      ? this.ensureArray(
          await this.client.fetch("game_videos", game.videos, [
            "name",
            "video_id",
          ])
        )
      : [];
    const videos = videosData
      .map((v, i) => ({
        id: i,
        gameId: game.id,
        name: v.name || "Video",
        url: v.video_id ? `https://www.youtube.com/watch?v=${v.video_id}` : "",
      }))
      .filter((v) => v.url);

    const websitesData = game.websites?.length
      ? this.ensureArray(
          await this.client.fetch("websites", game.websites, ["url"])
        )
      : [];
    const websites = websitesData
      .map((w, i) => ({
        id: i,
        gameId: game.id,
        url: w.url || "",
      }))
      .filter((w) => w.url);

    console.log({
      id: game.id,
      igdbId: game.id,
      name: game.name,
      summary: game.summary,
      storyline: game.storyline,
      cover: coverUrl,
      first_release_date: game.first_release_date
        ? new Date(game.first_release_date * 1000)
        : null,
      url: `https://www.igdb.com/games/${game.slug}`,
      createdAt: new Date(game.created_at * 1000).toISOString(),
      updatedAt: new Date(game.updated_at * 1000).toISOString(),
      criticsScore: game.aggregated_rating,
      criticsCount: game.aggregated_rating_count,
      usersScore: game.rating,
      usersCount: game.rating_count,
      totalScore: game.total_rating,
      totalCount: game.total_rating_count,
      artworks,
      screenshots,
      developers,
      publishers,
      genres,
      platforms,
      modes,
      themes,
      playerPerspectives,
      collections,
      franchises,
      gameEngines,
      videos,
      websites,
    });

    return {
      id: game.id,
      igdbId: game.id,
      name: game.name,
      summary: game.summary,
      storyline: game.storyline,
      cover: coverUrl,
      first_release_date: game.first_release_date
        ? new Date(game.first_release_date * 1000)
        : null,
      url: `https://www.igdb.com/games/${game.slug}`,
      createdAt: new Date(game.created_at * 1000).toISOString(),
      updatedAt: new Date(game.updated_at * 1000).toISOString(),
      criticsScore: game.aggregated_rating,
      criticsCount: game.aggregated_rating_count,
      usersScore: game.rating,
      usersCount: game.rating_count,
      totalScore: game.total_rating,
      totalCount: game.total_rating_count,
      artworks,
      screenshots,
      developers,
      publishers,
      genres,
      platforms,
      modes,
      themes,
      playerPerspectives,
      collections,
      franchises,
      gameEngines,
      videos,
      websites,
    };
  }
}

export { IGDBGameMapper };
