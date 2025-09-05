import { container } from "tsyringe";
import { UserRepository } from "../../modules/user/repositories/UserRepository";
import { IPasswordHasherProvider } from "../../modules/authentication/interfaces/IPasswordHasherProvider";
import { PasswordHasherProvider } from "../../modules/authentication/services/PasswordHasherProvider";
import { TokenProvider } from "../../modules/authentication/services/TokenProvider";
import { IUserRepository } from "../../modules/user/interfaces/IUserRepository";
import { IUserValidationService } from "../../modules/user/interfaces/IUserValidationService";
import { UserValidationService } from "../../modules/user/services/UserValidationService";
import { ITokenProvider } from "../../modules/authentication/interfaces/ITokenProvider";
import { ICatalogRepository } from "../../modules/catalog/interfaces/ICatalogRepository";
import { CatalogRepository } from "../../modules/catalog/repositories/CatalogRepository";
import { UpdateCatalogUseCase } from "../../modules/catalog/useCases/UpdateCatalogUseCase";
import { IGDBAuthService } from "../../modules/catalog/services/IGDBAuthService";
import { IGDBApiClient } from "../../modules/catalog/services/IGDBClientApi";
import { IGDBGameMapper } from "../../modules/catalog/services/IGDBGameMapper";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<ITokenProvider>("TokenProvider", TokenProvider);
container.registerSingleton<IPasswordHasherProvider>(
  "PasswordHasherProvider",
  PasswordHasherProvider
);
container.registerSingleton<IUserValidationService>(
  "UserValidationService",
  UserValidationService
);

container.registerSingleton<ICatalogRepository>(
  "CatalogRepository",
  CatalogRepository
);

container.registerSingleton<IGDBAuthService>(
  "IGDBAuthService",
  IGDBAuthService
);
container.registerSingleton<IGDBApiClient>("IGDBApiClient", IGDBApiClient);
container.registerSingleton<IGDBGameMapper>("IGDBGameMapper", IGDBGameMapper);

container.register<UpdateCatalogUseCase>(
  "UpdateCatalogUseCase",
  UpdateCatalogUseCase
);
