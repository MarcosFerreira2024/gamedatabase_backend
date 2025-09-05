import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";

const user_routes = Router();

const controller = new UserController();

user_routes.patch("/password", (req: Request, res: Response) =>
  controller.updatePassword(req, res)
);
user_routes.patch("/email", (req: Request, res: Response) =>
  controller.updateEmail(req, res)
);
user_routes.delete("/", (req: Request, res: Response) =>
  controller.delete(req, res)
);

export { user_routes };
