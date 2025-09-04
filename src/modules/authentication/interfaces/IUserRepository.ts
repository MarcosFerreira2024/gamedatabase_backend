import { User } from "../../../generated/prisma";

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(email: string, password: string): Promise<void>;
}

export { IUserRepository };
