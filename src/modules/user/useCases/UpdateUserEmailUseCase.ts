import { inject, injectable } from "tsyringe";
import { IPasswordHasherProvider } from "../../authentication/interfaces/IPasswordHasherProvider";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserValidationService } from "../interfaces/IUserValidationService";

@injectable()
class UpdateUserEmailUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("UserValidationService")
    private userValidationService: IUserValidationService
  ) {}

  async execute(email: string, password: string, newEmail: string) {
    await this.userValidationService.validateOrThrow(email, password);

    await this.userRepository.changeEmail(email, newEmail);
  }
}

export { UpdateUserEmailUseCase };
