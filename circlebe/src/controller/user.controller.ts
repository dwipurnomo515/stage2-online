import { Request, Response } from "express"
import userService from "../services/user.service";
import { updateUserDto } from "../dto/user.dto";
import { string } from "joi";
import cloudinaryService from "../services/cloudinary.service";
import { updateUserSchema } from "../utils/schemas/user.schema";
import follow1Service from "../services/follow1.service";


class userController {
    async find(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.json(error);

        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id
            const user = await userService.getUser(userId);
            const following = user?._count.following;
            const followers = user?._count.followers;

            res.json({
                ...user,
                followers,
                following
            })
        } catch (error) {
            res.json(error);

        }
    }
    async findSuggestedUsers(req: Request, res: Response) {
        try {
            const userId = parseInt((req as any).user.id);
            const suggestedUsers = await userService.getSuggestedUsers(userId);
            res.json(suggestedUsers);
        } catch (error) {
            console.error("Error fetching suggested users:", error); // Log kesalahan
            res.status(500).json({ error: "Error fetching suggested users" });
        }
    }


    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = (req as any).user.id;

            const users = await userService.getUserById(Number(id));
            const isFollow = await follow1Service.getFollowStatus(user, +id)
            res.json({ ...users, isFollow });
        } catch (error) {

            res.json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const users = await userService.createUser(req.body);
            res.json(users);
        } catch (error) {
            res.json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            let profileImageUrl: string | undefined;
            let backgroundImageUrl: string | undefined;
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            if (files?.profileImage) {
                const profileImage = await cloudinaryService.uploadSingle(files.profileImage[0]);
                profileImageUrl = profileImage.secure_url;
            }

            if (files?.backgroundImage) {
                const backgroundImage = await cloudinaryService.uploadSingle(files.backgroundImage[0]);
                backgroundImageUrl = backgroundImage.secure_url;
            }

            const body = {
                ...req.body,
                ...(profileImageUrl && { profileImage: profileImageUrl }),
                ...(backgroundImageUrl && { backgroundImage: backgroundImageUrl })
            }
            console.log('Received body:', {
                body
            }); // Log data yang diterima       

            const value = await updateUserSchema.validateAsync(body)
            const user = await userService.updateUser(userId, value)
            res.json(user);

        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: 'Failed to update user', error });
        }

    }

    async searchUser(req: Request, res: Response) {
        try {
            const search = req.query.q as string || '';

            const users = await userService.searchUser(search)
            res.json(users)
        } catch (error) {
            res.status(500).json({
                message: (error as Error).message
            })
        }
    }



    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const users = await userService.deleteUser(Number(id));
            res.json(users);
        } catch (error) {
            res.json(error);
        }
    }
}

export default new userController();