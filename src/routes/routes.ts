import { auth_routes } from "../modules/authentication/routes/route";
import { Router } from "express";
import { user_routes } from "../modules/user/routes/routes";

const routes = Router();

routes.use(auth_routes);
routes.use("/user", user_routes);

export { routes };
