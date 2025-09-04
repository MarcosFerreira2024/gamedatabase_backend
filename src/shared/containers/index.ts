import { container } from "tsyringe";
import { UserRepository } from "../../modules/user/repositories/UserRepository";
import { IUserRepository } from "../../modules/authentication/interfaces/IUserRepository";
import { IPasswordHasherProvider } from "../../modules/authentication/interfaces/IPasswordHasherProvider";
import { PasswordHasherProvider } from "../../modules/authentication/services/PasswordHasherProvider";
import { TokenProvider } from "../../modules/authentication/services/TokenProvider";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IPasswordHasherProvider>(
  "PasswordProvider",
  PasswordHasherProvider
);
container.registerSingleton<ITokenProvider>("TokenProvider", TokenProvider);
container.registerSingleton<IPasswordHasherProvider>(
  "PasswordHasherProvider",
  PasswordHasherProvider
);
