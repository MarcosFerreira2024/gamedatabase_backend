import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";

const user_routes = Router();

const controller = new UserController();

user_routes.patch("/password", (req: Request, res: Response) =>
  controller.updatePassword(req, res)
);

user_routes.get("/", (req: Request, res: Response) =>
  controller.userInfo(req, res)
);

user_routes.get("/wishlist", (req: Request, res: Response) =>
  controller.getWishlist(req, res)
);

user_routes.post("/wishlist/:id", (req: Request, res: Response) =>
  controller.addGameToWishlist(req, res)
);

user_routes.delete("/wishlist/:id", (req: Request, res: Response) =>
  controller.removeGameFromWishlist(req, res)
);

user_routes.get("/favs", (req: Request, res: Response) =>
  controller.getFavs(req, res)
);
user_routes.post("/fav/:id", (req: Request, res: Response) =>
  controller.addGameToFav(req, res)
);
user_routes.delete("/fav/:id", (req: Request, res: Response) =>
  controller.removeGameFromFav(req, res)
);

user_routes.patch("/email", (req: Request, res: Response) =>
  controller.updateEmail(req, res)
);
user_routes.delete("/", (req: Request, res: Response) =>
  controller.delete(req, res)
);

export { user_routes };
