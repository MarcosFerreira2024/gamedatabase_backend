import { Game } from "../../generated/prisma";
import { UserWithRelations } from "../../modules/user/interfaces/IUserRepository";

export function ensureUserAndGameExist(
  user: UserWithRelations | null,
  game: Game | null
) {
  if (!user) throw new Error("Usuário não encontrado");
  if (!game) throw new Error("Game não encontrado");

  return { user, game };
}
