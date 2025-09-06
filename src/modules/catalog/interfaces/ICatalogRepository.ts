import { Game } from "../../../generated/prisma";

interface ICatalogRepository {
  saveAll(games: GameData[]): Promise<void>;
  getByQuery(
    searchParams: SearchParams | null,
    sortParams: SortParams,
    take: Take,
    offset: number
  ): Promise<FilteredGames[] | FilteredGames | null>;
  getAll(): Promise<Game[]>;

  getOneById(id: number): Promise<Game | null>;
}

export { ICatalogRepository };
