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
    const verifiedToken = JWT.verify(token, process.env.JWT_SECRET as string);

    return verifiedToken as string;
  }
}
export { TokenProvider };
