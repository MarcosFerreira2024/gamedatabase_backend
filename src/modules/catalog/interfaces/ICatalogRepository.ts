import { GameData } from "./GameData";

interface ICatalogRepository {
  saveAll(games: GameData[]): Promise<void>;
}

export { ICatalogRepository };
