import { Request, Response } from "express";
import { errorHandler } from "../../../shared/helpers/errorHandler";
import { zodSchemaHandler } from "../../../shared/helpers/zodSchemaHandler";
import { container } from "tsyringe";
import { UpdateUserEmailUseCase } from "../useCases/UpdateUserEmailUseCase";
import { z } from "zod";

import {
  deleteUserSchema,
  GameActionSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
} from "../../../shared/schemas/schema";
import { UpdateUserPasswordUseCase } from "../useCases/UpdateUserPasswordUseCase";
import { DeleteUserUseCase } from "../useCases/DeleteUserUseCase";
import { GetUserUseCase } from "../useCases/GetUserUseCase";
import { AddGameToWishlistUseCase } from "../useCases/AddGameToWishlistUseCase";
import { RemoveGameFromFavUseCase } from "../useCases/RemoveGameFromFavUseCase";
import { AddGameToFavUseCase } from "../useCases/AddGameToFavUseCase";
import { RemoveGameFromWishlistUseCase } from "../useCases/RemoveGameFromWishlistUseCase";
import { getFavsUseCase } from "../useCases/getFavsUseCase";
import { GetWishlistUseCase } from "../useCases/GetWishlistUseCase";
class UserController {
  async delete(req: Request, res: Response) {
    try {
      const { email, password } = zodSchemaHandler(deleteUserSchema, req.body);

      await container.resolve(DeleteUserUseCase).execute(email, password);

      return res.status(200).json({
        message: "Usuário deleteado com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async userInfo(req: Request, res: Response) {
    try {
      const email = zodSchemaHandler(z.email(), req.body.email);

      const user = await container.resolve(GetUserUseCase).execute(email);

      return res.status(200).json(user);
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async getWishlist(req: Request, res: Response) {
    try {
      const email = zodSchemaHandler(z.email(), req.body.email);

      const wishlist = await container
        .resolve(GetWishlistUseCase)
        .execute(email);

      return res.status(200).json(wishlist);
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async getFavs(req: Request, res: Response) {
    try {
      const email = zodSchemaHandler(z.email(), req.body.email);

      const favs = await container.resolve(getFavsUseCase).execute(email);

      return res.status(200).json(favs);
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async addGameToWishlist(req: Request, res: Response) {
    try {
      const gameId = zodSchemaHandler(z.number(), +req.params.id);

      const email = zodSchemaHandler(z.email(), req.body.email);

      await container
        .resolve(AddGameToWishlistUseCase)
        .execute({ email, gameId });

      return res.status(200).json({
        message: "Game adicionado à wishlist com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async removeGameFromWishlist(req: Request, res: Response) {
    try {
      const gameId = zodSchemaHandler(z.number(), +req.params.id);

      const email = zodSchemaHandler(z.email(), req.body.email);

      await container
        .resolve(RemoveGameFromWishlistUseCase)
        .execute({ email, gameId });

      return res.status(200).json({
        message: "Game removido da wishlist com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async addGameToFav(req: Request, res: Response) {
    try {
      const gameId = zodSchemaHandler(z.number(), +req.params.id);

      const email = zodSchemaHandler(z.email(), req.body.email);

      await container.resolve(AddGameToFavUseCase).execute({ email, gameId });

      return res.status(200).json({
        message: "Game adicionado aos favoritos com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async removeGameFromFav(req: Request, res: Response) {
    try {
      const gameId = zodSchemaHandler(z.number(), +req.params.id);

      const email = zodSchemaHandler(z.email(), req.body.email);

      await container
        .resolve(RemoveGameFromFavUseCase)
        .execute({ email, gameId });

      return res.status(200).json({
        message: "Game removido dos favoritos com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async updateEmail(req: Request, res: Response) {
    try {
      const { email, password, newEmail } = zodSchemaHandler(
        updateUserEmailSchema,
        req.body
      );

      if (email === newEmail)
        throw new Error("Seu novo Email é identico ao seu antigo");

      await container
        .resolve(UpdateUserEmailUseCase)
        .execute(email, password, newEmail);

      return res.status(200).json({
        message: "Email alterado com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { email, password, newPassword } = zodSchemaHandler(
        updateUserPasswordSchema,
        req.body
      );

      await container
        .resolve(UpdateUserPasswordUseCase)
        .execute(email, password, newPassword);

      return res.status(200).json({
        message: "Senha alterada com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }
}

export { UserController };
