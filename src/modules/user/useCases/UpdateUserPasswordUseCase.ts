import { inject, injectable } from "tsyringe";
import { IPasswordHasherProvider } from "../../authentication/interfaces/IPasswordHasherProvider";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserValidationService } from "../interfaces/IUserValidationService";

@injectable()
class UpdateUserPasswordUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("PasswordHasherProvider")
    private passwordHasher: IPasswordHasherProvider,
    @inject("UserValidationService")
    private userValidationService: IUserValidationService
  ) {}

  async execute(email: string, password: string, newPassword: string) {
    const user = await this.userValidationService.validateOrThrow(
      email,
      password
    );

    const isNewPasswordEqualsToOld = await this.passwordHasher.compare(
      newPassword,
      user.password
    );
    if (isNewPasswordEqualsToOld)
      throw new Error("Sua nova senha deve ser diferente da antiga");

    const hashedPassword = await this.passwordHasher.hash(newPassword);
    await this.userRepository.changePassword(email, hashedPassword);
  }
}

export { UpdateUserPasswordUseCase };
