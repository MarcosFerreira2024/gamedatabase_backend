import { inject, injectable } from "tsyringe";
import { ICatalogRepository } from "../interfaces/ICatalogRepository";

@injectable()
class SearchAllGamesUseCase {
  constructor(
    @inject("CatalogRepository") private catalogRepository: ICatalogRepository
  ) {}

  async execute(sortParams: SortParams, take: Take, offset: number) {
    return await this.catalogRepository.getByQuery(
      null,
      sortParams,
      take,
      offset
    );
  }
}

export { SearchAllGamesUseCase };
