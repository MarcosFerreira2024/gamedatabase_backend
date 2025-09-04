import prisma from "../../../libs/prisma/prisma-client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../../../generated/prisma";

class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(email: string, password: string) {
    await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
  async changeEmail(email: string, newEmail: string): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        email: newEmail,
      },
    });
  }
  async changePassword(email: string, newPassword: string): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: newPassword,
      },
    });
  }
  async delete(email: string): Promise<void> {
    await prisma.user.delete({
      where: {
        email,
      },
    });
  }
}

export { UserRepository };
