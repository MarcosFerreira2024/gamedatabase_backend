import { User } from "../../../generated/prisma";

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(email: string, password: string): Promise<void>;
  delete(email: string): Promise<void>;
  changePassword(email: string, newPassword: string): Promise<void>;
  changeEmail(email: string, newEmail: string): Promise<void>;
}

export { IUserRepository };
