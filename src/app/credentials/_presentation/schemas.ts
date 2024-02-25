import { z } from "zod";

export const CreateCredentialSchema = z.object({
  name: z.string().min(1),
  username: z
    .string()
    .optional()
    .transform((arg) => arg || "*"),
  password: z.string().min(1),
  description: z.string().optional(),
});
