import { Request, Response } from "express";
import { CatalogRepository } from "../repositories/CatalogRepository";

class CatalogController {
  async getGames(req: Request, res: Response) {
    try {
      const queryParams = req.query;

      if (queryParams && queryParams.length != undefined) {
        console.log(queryParams.length);
        res.status(200).json({
          message: "QueryParams",
          tem: queryParams,
        });
      }

      const repo = new CatalogRepository();

      const item = await repo.getAll();

      res.status(200).json({
        item,
      });
      // retorno todos os jogos se n tiver parametro em ordem descrescente por popularidade
    } catch (e) {}
  }

  async getGameById(req: Request, res: Response) {
    try {
      const id = +req.params.id;

      const repo = new CatalogRepository();

      const item = await repo.getOneById(id);

      res.status(200).json({
        item,
      });
    } catch (e) {}
  }
}

export { CatalogController };
