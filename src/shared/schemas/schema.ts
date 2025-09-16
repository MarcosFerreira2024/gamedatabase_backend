import { z } from "zod";

export const EmailPasswordSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Sua senha deve conter no mínimo 6 caracteres" }),
});

export type EmailPassword = z.infer<typeof EmailPasswordSchema>;

export const updateUserEmailSchema = EmailPasswordSchema.extend({
  newEmail: z.email(),
});

export const updateUserPasswordSchema = EmailPasswordSchema.extend({
  newPassword: z
    .string()
    .min(6, { message: "Sua senha deve conter no mínimo 6 caracteres" }),
});

export const GameActionSchema = z.object({
  email: z.email(),
  gameId: z.number(),
});

export const deleteUserSchema = EmailPasswordSchema;

export const loginSchema = EmailPasswordSchema;
export const signUpSchema = EmailPasswordSchema;
