import { inject, injectable } from "tsyringe";
import { IPasswordHasherProvider } from "../interfaces/IPasswordHasherProvider";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
class SignUpUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("PasswordHasherProvider")
    private passwordHasher: IPasswordHasherProvider
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (user) throw new Error("Usuário já existe, tente cadastrar outro email");

    const hashedPassword = await this.passwordHasher.hash(password);
    await this.userRepository.create(email, hashedPassword);
  }
}

export { SignUpUseCase };
