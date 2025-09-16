import { User } from "../../../generated/prisma";
import prisma from "../../../libs/prisma/prisma-client";
import { Favs, IUserRepository, Wishlist } from "../interfaces/IUserRepository";

class UserRepository implements IUserRepository {
  async getFavs(email: string): Promise<number[] | null> {
    const fav = await prisma.user.findMany({
      where: {
        email,
      },
      select: {
        favorites: {
          select: {
            igdbId: true,
          },
        },
      },
    });

    const favIds = fav.flatMap((user) => user.favorites.map((f) => f.igdbId));

    return favIds;
  }
  async getWishlist(email: string): Promise<Wishlist | null> {
    const wishlist = await prisma.user.findMany({
      where: {
        email,
      },
      select: {
        wishlist: true,
      },
    });

    const wishListNormalized = wishlist.flatMap((user) => user.wishlist);

    return wishListNormalized;
  }
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async addGameToFav(email: string, gameId: number): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        favorites: {
          connect: {
            igdbId: gameId,
          },
        },
      },
    });
  }
  async addGameToWishlist(email: string, gameId: number): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        wishlist: {
          connect: {
            igdbId: gameId,
          },
        },
      },
    });
  }
  async removeGameFromFav(email: string, gameId: number): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        favorites: {
          disconnect: {
            igdbId: gameId,
          },
        },
      },
    });
  }
  async removeGameFromWishlist(email: string, gameId: number): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        wishlist: {
          disconnect: {
            igdbId: gameId,
          },
        },
      },
    });
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
