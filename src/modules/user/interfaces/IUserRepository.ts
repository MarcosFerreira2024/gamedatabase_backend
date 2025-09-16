import { Prisma, User } from "../../../generated/prisma";

export type Favs = {
  favorites: {
    igdbId: number;
  }[];
};

type WishlistGame = {
  name: string;
  id: number;
  igdbId: number;
  summary: string | null;
  storyline: string | null;
  cover: string | null;
  first_release_date: Date | null;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  criticScore: number | null;
  criticCount: number | null;
  userScore: number | null;
  userCount: number | null;
  totalScore: number | null;
  totalCount: number | null;
};

export type Wishlist = WishlistGame[];

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(email: string, password: string): Promise<void>;
  delete(email: string): Promise<void>;
  changePassword(email: string, newPassword: string): Promise<void>;
  changeEmail(email: string, newEmail: string): Promise<void>;
  addGameToFav(email: string, gameId: number): Promise<void>;
  removeGameFromFav(email: string, gameId: number): Promise<void>;
  addGameToWishlist(email: string, gameId: number): Promise<void>;
  removeGameFromWishlist(email: string, gameId: number): Promise<void>;
  getFavs(email: string): Promise<number[] | null>;
  getWishlist(email: string): Promise<Wishlist | null>;
}

export { IUserRepository };
