import { Request, Response } from "express";
import threadService from "../services/thread.service";
import { createThreadSchema } from "../utils/schemas/thread.schema";
import cloudinaryService from "../services/cloudinary.service";

class ThreadController {
    async find(req: Request, res: Response) {
        try {
            // Akses user yang sudah di-decode dari token melalui middleware authentication
            const user = (req as any).user;
            const userId = user.id;

            // Panggil service dengan userId
            const threads = await threadService.getAllThreads(userId);

            res.json(threads);
        } catch (error) {
            if (error instanceof Error) {
                // Jika error adalah instance dari Error
                res.status(500).json({ error: error.message });
            } else {
                // Jika tipe error bukan instance dari Error
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const threads = await threadService.getThreadById(Number(id));
            res.json(threads);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async create(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/CreateThreadDTO"
                    }  
                }
            }
        } 
    */

        try {


            const user = (req as any).user;
            const image = await cloudinaryService.uploadSingle(req.file as Express.Multer.File)
            const body = {
                ...req.body,
                image: image.secure_url
            }
            const value = await createThreadSchema.validateAsync(body);
            const threads = await threadService.createThread(value, user);
            console.log("Created thread:", threads); // Tambahkan ini untuk debug

            res.json(threads);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UpdateThreadDTO"
                        }  
                    }
                }
            } 
        */
        try {
            const threads = await threadService.updateThread(req.body);
            res.json(threads);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const threads = await threadService.deleteThread(Number(id));
            res.json(threads);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new ThreadController();