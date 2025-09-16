import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ICatalogRepository } from "../../catalog/interfaces/ICatalogRepository";
import { ensureUserAndGameExist } from "../../../shared/helpers/ensureUserAndGameExistence";

@injectable()
class AddGameToFavUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("CatalogRepository") private catalogRepository: ICatalogRepository
  ) {}

  async execute({ email, gameId }: { email: string; gameId: number }) {
    const { user, game } = ensureUserAndGameExist(
      await this.userRepository.findByEmail(email),
      await this.catalogRepository.getOneById(gameId)
    );

    const favs = await this.userRepository.getFavs(email);

    if (favs && favs.length > 0) {
      console.log(favs);
      if (favs.some((igdbId) => igdbId === game.igdbId))
        throw new Error("Game ja adicionado aos favoritos");
    }

    await this.userRepository.addGameToFav(email, gameId);
  }
}

export { AddGameToFavUseCase };
