import { Request, Response } from "express";
import { CatalogRepository } from "../repositories/CatalogRepository";
import { container } from "tsyringe";
import { SearchGamesUseCase } from "../useCases/SearchGamesUseCase";
import { zodSchemaHandler } from "../../../shared/helpers/zodSchemaHandler";
import z from "zod";
import { searchSchema } from "../schema/schema";
import { SearchAllGamesUseCase } from "../useCases/SearchAllGamesUseCase";
import { errorHandler } from "../../../shared/helpers/errorHandler";
import { GetGameInfoByIdUseCase } from "../useCases/GetGameInfoByIdUseCase";
class CatalogController {
  async getGames(req: Request, res: Response) {
    try {
      const query = req.query;

      const allowedParams = [
        "name",
        "genres",
        "sortBy",
        "page",
        "take",
        "order",
        "platforms",
        "summary",
        "franchises",
        "modes",
        "developers",
        "publishers",
        "usersScore",
        "themes",
        "playerPerspectives",
        "first_release_date",
        "gameEngines",
        "collections",
      ];

      let params = Object.fromEntries(
        Object.entries(query).filter(([key]) => allowedParams.includes(key))
      );
      const normalizedParams = Object.fromEntries(
        Object.entries(params).map(([key, value]) => [
          key,
          value === "" ? undefined : value,
        ])
      );

      const validatedData = zodSchemaHandler(searchSchema, normalizedParams);

      const { take, page, sortBy, order, ...searchParams } = validatedData;

      const offset = take * (page - 1);

      if (!searchParams) {
        const allGames = await container
          .resolve(SearchAllGamesUseCase)
          .execute({ sortBy, order } as SortParams, take, offset);

        return res.status(200).json(allGames);
      }

      const games = await container
        .resolve(SearchGamesUseCase)
        .execute(searchParams, { sortBy, order } as SortParams, take, offset);

      res.status(200).json(games);
      return;
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async getGameById(req: Request, res: Response) {
    try {
      const id = +req.params.id;

      const game = await container.resolve(GetGameInfoByIdUseCase).execute(id);

      return res.status(200).json(game);
    } catch (e) {
      errorHandler(e, res);
    }
  }
}

export { CatalogController };
