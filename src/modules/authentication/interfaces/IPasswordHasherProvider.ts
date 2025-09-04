interface IPasswordHasherProvider {
  compare(password: string, hashedPassword: string): Promise<boolean>;
  hash(password: string): Promise<string>;
}

export { IPasswordHasherProvider };
