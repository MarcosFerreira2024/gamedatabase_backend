import { injectable, inject } from "tsyringe";
import { IGDBApiClient } from "./IGDBClientApi";
import { GameData } from "../interfaces/GameData";

@injectable()
class IGDBGameMapper {
  constructor(@inject("IGDBApiClient") private client: IGDBApiClient) {}

  private async fetchNamesByIds(
    endpoint: string,
    ids?: number[]
  ): Promise<string[]> {
    if (!ids || ids.length === 0) return [];
    const items = await this.client.fetch(endpoint, ids, ["name"]);
    return (items || []).map((item: any) => item.name);
  }

  private buildImageUrl(
    imageId?: string,
    size: string = "1080p"
  ): string | null {
    if (!imageId) return null;
    return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
  }

  async getGameWithResolvedData(gameId: number): Promise<GameData | null> {
    const [game] = await this.client.fetch(
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
    );

    if (!game) return null;

    const [coverData, artworksData, screenshotsData] = await Promise.all([
      game.cover ? this.client.fetch("covers", [game.cover], ["image_id"]) : [],
      (game.artworks || []).length > 0
        ? this.client.fetch("artworks", game.artworks, ["image_id"])
        : [],
      (game.screenshots || []).length > 0
        ? this.client.fetch("screenshots", game.screenshots, ["image_id"])
        : [],
    ]);

    const coverUrl =
      this.buildImageUrl(coverData[0]?.image_id) ||
      "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png";

    const artworksUrls = (artworksData || [])
      .map((a: any) => this.buildImageUrl(a.image_id))
      .filter(Boolean) as string[];
    const screenshotsUrls = (screenshotsData || [])
      .map((s: any) => this.buildImageUrl(s.image_id))
      .filter(Boolean) as string[];

    const [
      genres,
      platforms,
      modes,
      themes,
      perspectives,
      collections,
      franchises,
      engines,
    ] = await Promise.all([
      this.fetchNamesByIds("genres", game.genres || []),
      this.fetchNamesByIds("platforms", game.platforms || []),
      this.fetchNamesByIds("game_modes", game.game_modes || []),
      this.fetchNamesByIds("themes", game.themes || []),
      this.fetchNamesByIds(
        "player_perspectives",
        game.player_perspectives || []
      ),
      this.fetchNamesByIds("collections", game.collections || []),
      this.fetchNamesByIds("franchises", game.franchises || []),
      this.fetchNamesByIds("game_engines", game.game_engines || []),
    ]);

    const companiesData =
      (await this.client.fetch(
        "involved_companies",
        game.involved_companies || [],
        ["company", "developer", "publisher"]
      )) || [];

    const companyIds = companiesData.map((c: any) => c.company);
    const companiesInfo =
      (await this.client.fetch("companies", companyIds, ["name"])) || [];

    const gameDevelopers = companiesData
      .filter((c: any) => c.developer)
      .map(
        (c: any) => companiesInfo.find((ci: any) => ci.id === c.company)?.name
      )
      .filter(Boolean) as string[];

    const gamePublishers = companiesData
      .filter((c: any) => c.publisher)
      .map(
        (c: any) => companiesInfo.find((ci: any) => ci.id === c.company)?.name
      )
      .filter(Boolean) as string[];

    const videosData =
      (await this.client.fetch("game_videos", game.videos || [], [
        "name",
        "video_id",
      ])) || [];
    const videoUrls = videosData.map(
      (v: any) => `https://www.youtube.com/watch?v=${v.video_id}`
    );

    const websitesData =
      (await this.client.fetch("websites", game.websites || [], ["url"])) || [];
    const websiteUrls = websitesData.map((w: any) => w.url);

    return {
      igdbId: game.id,
      name: game.name,
      description: game.summary,
      storyline: game.storyline,
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000)
        : null,
      cover: coverUrl,
      artworks: artworksUrls,
      screenshots: screenshotsUrls,
      criticsScore: game.aggregated_rating,
      criticsCount: game.aggregated_rating_count,
      usersScore: game.rating,
      usersCount: game.rating_count,
      totalScore: game.total_rating,
      totalCount: game.total_rating_count,
      updatedAt: new Date(game.updated_at * 1000),
      createdAt: new Date(game.created_at * 1000),
      gameDevelopers,
      gamePublishers,
      gameGenres: genres,
      gamePlatforms: platforms,
      gameModes: modes,
      gameThemes: themes,
      playerPerspectives: perspectives,
      collections,
      franchises,
      gameEngines: engines,
      videos: videoUrls,
      websites: websiteUrls,
      url: `https://www.igdb.com/games/${game.slug}`,
    };
  }
}

export { IGDBGameMapper };
