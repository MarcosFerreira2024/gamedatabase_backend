import { inject, injectable } from "tsyringe";
import { ITokenProvider } from "../interfaces/ITokenProvider";

@injectable()
class VerifyTokenUseCase {
  constructor(@inject("TokenProvider") private tokenProvider: ITokenProvider) {}
  execute(token: string) {
    return this.tokenProvider.verify(token);
  }
}

export { VerifyTokenUseCase };
