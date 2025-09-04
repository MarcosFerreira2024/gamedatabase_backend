import { IPasswordHasherProvider } from "../interfaces/IPasswordHasherProvider";

import bcrypt from "bcrypt";

class PasswordHasherProvider implements IPasswordHasherProvider {
  private saltRounds: number = 10;

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}

export { PasswordHasherProvider };
