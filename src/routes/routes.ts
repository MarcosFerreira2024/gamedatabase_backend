import { auth_routes } from "../modules/authentication/routes/route";
import { Router } from "express";
import { user_routes } from "../modules/user/routes/routes";
import { catalog_routes } from "../modules/catalog/routes/route";

const routes = Router();

routes.use("/auth", auth_routes);
routes.use("/user", user_routes);
routes.use("/games", catalog_routes);

export { routes };
