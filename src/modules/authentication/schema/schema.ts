import { z } from "zod";

const email = z.email();
const password = z
  .string()
  .min(6, { message: "Sua senha deve conter no mínimo 6 caracteres" });

export const loginSchema = z.object({ email, password });
export type LoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({ email, password });
export type SignUpSchema = z.infer<typeof signUpSchema>;
