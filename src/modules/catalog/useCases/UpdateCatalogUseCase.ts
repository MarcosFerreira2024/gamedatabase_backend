import { inject, injectable } from "tsyringe";
import { CatalogRepository } from "../repositories/CatalogRepository";
import { IGDBApiClient } from "../services/IGDBClientApi";
import { IGDBGameMapper } from "../services/IGDBGameMapper";
import { GameData } from "../interfaces/GameData";

@injectable()
export class UpdateCatalogUseCase {
  constructor(
    @inject("IGDBApiClient") private igdbApiClient: IGDBApiClient,
    @inject("IGDBGameMapper") private igdbGameMapper: IGDBGameMapper,
    @inject("CatalogRepository") private catalogRepo: CatalogRepository
  ) {}

  async execute() {
    try {
      const games = await this.igdbApiClient.fetchAll("games", [
        "id",
        "name",
        "genres",
        "platforms",
        "cover",
        "artworks",
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
      ]);
      const mappedGames: GameData[] = [];
      for (const game of games) {
        const mappedGame = await this.igdbGameMapper.getGameWithResolvedData(
          game.id
        );
        if (mappedGame) {
          mappedGames.push(mappedGame);
        }
      }
      await this.catalogRepo.saveAll(mappedGames);
    } catch (error) {
      console.error("Error updating catalog:", error);
    }
  }
}
