import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("invalid email address!"),
    password: z.string().min(4, "password must be at least 4 characters!"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;