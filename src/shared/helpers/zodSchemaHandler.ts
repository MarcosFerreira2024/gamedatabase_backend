import { ZodType } from "zod";

export function zodSchemaHandler<T>(schema: ZodType<T>, data: unknown): T {
  if (!data) throw new Error("requisição sem dados");
  const validation = schema.safeParse(data);

  if (validation.error)
    throw new Error(`${validation.error?.issues[0].message}`);

  return validation.data;
}
