import { User } from "../../../generated/prisma";

interface IUserValidationService {
  validateOrThrow(email: string, password: string): Promise<User>;
}

export { IUserValidationService };
