interface ITokenProvider {
  generate(email: string): string;
  verify(token: string): string;
}

export { ITokenProvider };
