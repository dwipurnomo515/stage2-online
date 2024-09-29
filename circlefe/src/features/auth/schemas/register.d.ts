import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    fullName: string;
    email: string;
}, {
    password: string;
    fullName: string;
    email: string;
}>;
export type RegisterFormInputs = z.infer<typeof registerSchema>;
