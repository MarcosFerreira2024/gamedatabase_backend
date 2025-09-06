import { inject, injectable } from "tsyringe";
import { ICatalogRepository } from "../interfaces/ICatalogRepository";

@injectable()
class SearchGamesUseCase {
  constructor(
    @inject("CatalogRepository") private catalogRepository: ICatalogRepository
  ) {}

  async execute(
    searchParams: SearchParams,
    sortParams: SortParams,
    take: Take,
    offset: number
  ) {
    return await this.catalogRepository.getByQuery(
      searchParams,
      sortParams,
      take,
      offset
    );
  }
}

export { SearchGamesUseCase };
