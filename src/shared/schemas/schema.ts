import { z } from "zod";

// base
export const EmailPasswordSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Sua senha deve conter no mínimo 6 caracteres" }),
});
export type EmailPassword = z.infer<typeof EmailPasswordSchema>;

// user
export const updateUserEmailSchema = EmailPasswordSchema.extend({
  newEmail: z.email(),
});

export const updateUserPasswordSchema = EmailPasswordSchema.extend({
  newPassword: z
    .string()
    .min(6, { message: "Sua senha deve conter no mínimo 6 caracteres" }),
});
export const deleteUserSchema = EmailPasswordSchema;

// auth
export const loginSchema = EmailPasswordSchema;
export const signUpSchema = EmailPasswordSchema;
