import { Request, Response } from "express";
import { errorHandler } from "../../../shared/helpers/errorHandler";
import { zodSchemaHandler } from "../../../shared/helpers/zodSchemaHandler";
import { container } from "tsyringe";
import { UpdateUserEmailUseCase } from "../useCases/UpdateUserEmailUseCase";
import {
  deleteUserSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
} from "../../../shared/schemas/schema";
import { UpdateUserPasswordUseCase } from "../useCases/UpdateUserPasswordUseCase";
import { DeleteUserUseCase } from "../useCases/DeleteUserUseCase";
class UserController {
  async delete(req: Request, res: Response) {
    try {
      const { email, password } = zodSchemaHandler(deleteUserSchema, req.body);

      await container.resolve(DeleteUserUseCase).execute(email, password);

      return res.status(200).json({
        message: "Usuário deleteado com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async updateEmail(req: Request, res: Response) {
    try {
      const { email, password, newEmail } = zodSchemaHandler(
        updateUserEmailSchema,
        req.body
      );

      if (email === newEmail)
        throw new Error("Seu novo Email é identico ao seu antigo");

      await container
        .resolve(UpdateUserEmailUseCase)
        .execute(email, password, newEmail);

      return res.status(200).json({
        message: "Email alterado com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { email, password, newPassword } = zodSchemaHandler(
        updateUserPasswordSchema,
        req.body
      );

      await container
        .resolve(UpdateUserPasswordUseCase)
        .execute(email, password, newPassword);

      return res.status(200).json({
        message: "Senha alterada com sucesso",
      });
    } catch (e) {
      errorHandler(e, res);
    }
  }
}

export { UserController };
