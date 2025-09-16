import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
class getFavsUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}
  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("Usuário nao encontrado");

    const favs = await this.userRepository.getFavs(user.email);

    return favs;
  }
}

export { getFavsUseCase };
