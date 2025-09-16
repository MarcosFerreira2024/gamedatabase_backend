import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ICatalogRepository } from "../../catalog/interfaces/ICatalogRepository";
import { ensureUserAndGameExist } from "../../../shared/helpers/ensureUserAndGameExistence";

@injectable()
class RemoveGameFromWishlistUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("CatalogRepository") private catalogRepository: ICatalogRepository
  ) {}

  async execute({ email, gameId }: { email: string; gameId: number }) {
    const { game } = ensureUserAndGameExist(
      await this.userRepository.findByEmail(email),
      await this.catalogRepository.getOneById(gameId)
    );

    const wishlist = await this.userRepository.getWishlist(email);

    if (!wishlist) throw new Error("Wishlist nao encontrada");

    if (!wishlist.some((wished) => wished.igdbId === game.igdbId))
      throw new Error("Game nao encontrado na wishlist");

    await this.userRepository.removeGameFromWishlist(email, gameId);
  }
}

export { RemoveGameFromWishlistUseCase };
