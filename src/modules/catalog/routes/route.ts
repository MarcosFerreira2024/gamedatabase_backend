import { Request, Response, Router } from "express";
import { CatalogController } from "../controller/CatalogController";

const catalog_routes = Router();

const controller = new CatalogController();

catalog_routes.get("/", (req: Request, res: Response) => {
  controller.getGames(req, res);
});

catalog_routes.get("/:id", (req: Request, res: Response) =>
  controller.getGameById(req, res)
);

export { catalog_routes };
