import { inject, injectable } from "tsyringe";
import { IPasswordHasherProvider } from "../interfaces/IPasswordHasherProvider";
import { IUserRepository } from "../../user/interfaces/IUserRepository";
import { ITokenProvider } from "../interfaces/ITokenProvider";

@injectable()
class LoginUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("TokenProvider") private tokenProvider: ITokenProvider,
    @inject("PasswordHasherProvider")
    private passwordHasher: IPasswordHasherProvider
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("Esse usuário não existe, registre-se");
    const passwordMatch = await this.passwordHasher.compare(
      password,
      user.password
    );

    if (!passwordMatch) throw new Error("Dados inválidos");

    const token = this.tokenProvider.generate(email);
    return token;
  }
}

export { LoginUseCase };
