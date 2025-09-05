import { Response } from "express";

function errorHandler(e: any, res: Response) {
  if (e instanceof Error) return res.status(400).json({ message: e.message });
  else
    return res
      .status(200)
      .json({ message: "Ocorreu um erro interno, tente novamente" });
}

export { errorHandler };
