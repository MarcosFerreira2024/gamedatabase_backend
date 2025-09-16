import JWT, { JwtPayload } from "jsonwebtoken";
import { ITokenProvider } from "../interfaces/ITokenProvider";

class TokenProvider implements ITokenProvider {
  generate(email: string): string {
    const token = JWT.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    return token;
  }

  verify(token: string): string {
    try {
      JWT.verify(token, process.env.JWT_SECRET as string);
      return "Token válido";
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expirado");
      }
      if (error.name === "NotBeforeError") {
        throw new Error("Token ainda não está válido");
      }
      throw new Error("Token inválido");
    }
  }
}
export { TokenProvider };
