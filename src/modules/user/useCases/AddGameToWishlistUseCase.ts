import { inject, injectable } from "tsyringe";
import { ICatalogRepository } from "../../catalog/interfaces/ICatalogRepository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ensureUserAndGameExist } from "../../../shared/helpers/ensureUserAndGameExistence";

@injectable()
class AddGameToWishlistUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("CatalogRepository") private catalogRepository: ICatalogRepository
  ) {}

  async execute({ email, gameId }: { email: string; gameId: number }) {
    const { user, game } = ensureUserAndGameExist(
      await this.userRepository.findByEmail(email),
      await this.catalogRepository.getOneById(gameId)
    );

    const wishlist = await this.userRepository.getWishlist(email);

    if (wishlist) {
      if (wishlist.some((wished) => wished.igdbId === game.igdbId))
        throw new Error("Game ja adicionado aos favoritos");
    }

    await this.userRepository.addGameToWishlist(email, gameId);
  }
}

export { AddGameToWishlistUseCase };
