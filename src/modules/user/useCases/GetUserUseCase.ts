import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
class GetUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("Usuário nao encontrado");

    const { password, ...rest } = user;
    return rest;
  }
}

export { GetUserUseCase };
