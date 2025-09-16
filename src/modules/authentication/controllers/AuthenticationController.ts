import { Request, Response } from "express";
import { zodSchemaHandler } from "../../../shared/helpers/zodSchemaHandler";
import { loginSchema, signUpSchema } from "../../../shared/schemas/schema";
import { container } from "tsyringe";
import { LoginUseCase } from "../useCases/LoginUseCase";
import { SignUpUseCase } from "../useCases/SignUpUseCase";
import { errorHandler } from "../../../shared/helpers/errorHandler";
import { VerifyTokenUseCase } from "../useCases/VerifyTokenUseCase";

class AuthenticationController {
  async defaultLogin(req: Request, res: Response) {
    try {
      const { email, password } = zodSchemaHandler(loginSchema, req.body);

      const token = await container
        .resolve(LoginUseCase)
        .execute(email, password);

      return res.status(200).json({ token });
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async signUp(req: Request, res: Response) {
    try {
      const { email, password } = zodSchemaHandler(signUpSchema, req.body);

      await container.resolve(SignUpUseCase).execute(email, password);

      return res.status(200).json({ message: "Usuário criado com sucesso" });
    } catch (e) {
      errorHandler(e, res);
    }
  }
  verifyToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) throw new Error("Token nao encontrado");

      const result = container.resolve(VerifyTokenUseCase).execute(token);
      return res.status(200).json({ message: result });
    } catch (e) {
      errorHandler(e, res);
    }
  }
}

export { AuthenticationController };
