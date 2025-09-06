import { inject, injectable } from "tsyringe";
import { ICatalogRepository } from "../interfaces/ICatalogRepository";

@injectable()
class GetGameInfoByIdUseCase {
  constructor(
    @inject("CatalogRepository") private catalogRepo: ICatalogRepository
  ) {}

  async execute(id: number) {
    const game = await this.catalogRepo.getOneById(id);

    if (!game) throw new Error("Esse jogo não existe");

    return game;
  }
}

export { GetGameInfoByIdUseCase };
