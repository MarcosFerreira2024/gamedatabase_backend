import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

const auth_routes = Router();

const controller = new AuthenticationController();

auth_routes.post("/login", (req, res) => controller.defaultLogin(req, res));
auth_routes.post("/signup", (req, res) => controller.signUp(req, res));

export { auth_routes };
