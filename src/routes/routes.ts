import { auth_route } from "../modules/authentication/routes/route";
import { Router } from "express";

const routes = Router();

routes.use(auth_route);

export { routes };
