import { string, z } from "zod";



export const updateUserSchema = z.object({
    fullName: string(),
    userName: string(),
    bio: string(),
    profileImage: z.instanceof(FileList).optional(),
    backgroundImage: z.instanceof(FileList).optional()
});


export type updateUserFormInput = z.infer<typeof updateUserSchema>;