import { inject, injectable } from "tsyringe";
import { IPasswordHasherProvider } from "../../authentication/interfaces/IPasswordHasherProvider";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
class UserValidationService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("PasswordHasherProvider")
    private passwordHasher: IPasswordHasherProvider
  ) {}

  async validateOrThrow(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Usuário não existe");

    const passwordMatches = await this.passwordHasher.compare(
      password,
      user.password
    );
    if (!passwordMatches) throw new Error("Senha está incorreta");

    return user;
  }
}

export { UserValidationService };
