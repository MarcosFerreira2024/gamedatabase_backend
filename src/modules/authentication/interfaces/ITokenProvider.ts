interface ITokenProvider {
  generateToken(email: string): string;
  verifyToken(token: string): string;
}
