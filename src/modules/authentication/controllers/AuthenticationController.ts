import { Request, Response } from "express";
import { zodSchemaHandler } from "../../../shared/helpers/zodSchemaHandler";
import { loginSchema, signUpSchema } from "../schema/schema";
import { container } from "tsyringe";
import { LoginUseCase } from "../useCases/LoginUseCase";
import { SignUpUseCase } from "../useCases/SignUpUseCase";

class AuthenticationController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = zodSchemaHandler(loginSchema, req.body);

      const token = await container
        .resolve(LoginUseCase)
        .execute(email, password);

      return res.status(200).json({ token });
    } catch (e) {
      if (e instanceof Error)
        return res.status(400).json({ message: e.message });
      else
        return res
          .status(200)
          .json({ message: "Ocorreu um erro interno, tente novamente" });
    }
  }

  async signUp(req: Request, res: Response) {
    try {
      const { email, password } = zodSchemaHandler(signUpSchema, req.body);

      await container.resolve(SignUpUseCase).execute(email, password);

      return res.status(200).json({ message: "Usuário criado com sucesso" });
    } catch (e) {
      if (e instanceof Error)
        return res.status(400).json({ message: e.message });
      else
        return res
          .status(500)
          .json({ message: "Ocorreu um erro interno, tente novamente" });
    }
  }
}

export { AuthenticationController };
