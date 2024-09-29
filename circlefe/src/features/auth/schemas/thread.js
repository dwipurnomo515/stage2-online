import { z } from "zod";
export var createThreadSchema = z.object({
    content: z.string(),
    image: z
        .instanceof(FileList)
        .refine(function (file) { return file.length == 1; }, "File is required!"),
});
