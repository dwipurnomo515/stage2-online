import { z } from "zod";

export const createThreadSchema = z.object({
    content: z.string(),
    image: z.string(),
});

export type CreateThreadFormInputs = z.infer<typeof createThreadSchema>;