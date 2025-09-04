import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

const auth_route = Router();

const controller = new AuthenticationController();

auth_route.post("/login", (req, res) => controller.login(req, res));
auth_route.post("/signup", (req, res) => controller.signUp(req, res));

export { auth_route };
