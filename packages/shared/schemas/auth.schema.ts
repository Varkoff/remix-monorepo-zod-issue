import z from "zod";

export const passwordSchema = z
  .string({
    required_error: "Le mot de passe est obligatoire",
  })
  .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" });

export const emailSchema = z
  .string({ required_error: "L'adresse e-mail est obligatoire" })
  .email({ message: "Veuillez entrer une adresse email valide." });

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  redirectTo: z.string().optional(),
});
