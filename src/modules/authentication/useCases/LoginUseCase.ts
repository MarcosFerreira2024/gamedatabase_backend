import { inject, injectable } from "tsyringe";
import { IPasswordHasherProvider } from "../interfaces/IPasswordHasherProvider";
import { IUserRepository } from "../../user/interfaces/IUserRepository";

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
    const passwordMatch = this.passwordHasher.compare(password, user.password);

    if (!passwordMatch) throw new Error("Dados inválidos");

    const token = this.tokenProvider.generateToken(email);
    return token;
  }

  // verificar existencia do usuario
  // comparar senhas
  // gerar token
  // retornar token
}

export { LoginUseCase };
