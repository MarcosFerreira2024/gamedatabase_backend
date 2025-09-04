import prisma from "../../../libs/prisma/prisma-client";
import { IUserRepository } from "../../authentication/interfaces/IUserRepository";
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
}

export { UserRepository };
