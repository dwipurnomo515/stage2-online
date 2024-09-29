import { z } from "zod";
export declare const createThreadSchema: z.ZodObject<{
    content: z.ZodString;
    image: z.ZodEffects<z.ZodType<FileList, z.ZodTypeDef, FileList>, FileList, FileList>;
}, "strip", z.ZodTypeAny, {
    image: FileList;
    content: string;
}, {
    image: FileList;
    content: string;
}>;
export type CreateThreadFormInputs = z.infer<typeof createThreadSchema>;
