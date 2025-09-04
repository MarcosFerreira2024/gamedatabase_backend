import JWT, { JwtPayload } from "jsonwebtoken";

class TokenProvider implements ITokenProvider {
  generateToken(email: string): string {
    const token = JWT.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    return token;
  }

  verifyToken(token: string): string {
    const verifiedToken = JWT.verify(token, process.env.JWT_SECRET as string);

    return verifiedToken as string;
  }
}
export { TokenProvider };
