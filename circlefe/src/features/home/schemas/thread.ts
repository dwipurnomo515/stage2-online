import { z } from "zod";

export const createThreadSchema = z.object({
    content: z.string().min(1, "Content is required!"), // Validasi untuk konten
    image: z
        .array(z.instanceof(File)) // Mengubah tipe menjadi array File
        .refine((file) => file.length === 1, "File is required!"), // Pastikan hanya ada 1 file yang dipilih
});

export type CreateThreadFormInputs = z.infer<typeof createThreadSchema>;
