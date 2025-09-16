import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
class GetWishlistUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}
  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("Usuário nao encontrado");

    const wishList = await this.userRepository.getWishlist(user.email);

    return wishList;
  }
}

export { GetWishlistUseCase };
