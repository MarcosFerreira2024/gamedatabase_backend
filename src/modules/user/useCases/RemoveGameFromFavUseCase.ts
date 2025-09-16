import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ICatalogRepository } from "../../catalog/interfaces/ICatalogRepository";
import { ensureUserAndGameExist } from "../../../shared/helpers/ensureUserAndGameExistence";

@injectable()
class RemoveGameFromFavUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("CatalogRepository") private catalogRepository: ICatalogRepository
  ) {}

  async execute({ email, gameId }: { email: string; gameId: number }) {
    const { game, user } = ensureUserAndGameExist(
      await this.userRepository.findByEmail(email),
      await this.catalogRepository.getOneById(gameId)
    );

    const favs = await this.userRepository.getFavs(email);

    if (!favs || favs.length <= 0)
      throw new Error("Favoritos nao encontrados ou vazios");

    if (!favs.some((igdbId) => igdbId === game.igdbId)) {
      throw new Error("Game ja removido dos favoritos");
    }

    await this.userRepository.removeGameFromFav(email, gameId);
  }
}

export { RemoveGameFromFavUseCase };
