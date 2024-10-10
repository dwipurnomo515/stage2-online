import { Request, Response } from "express";
import followService from "../services/follow.service";




class followController {
    async toggleFollow(req: Request, res: Response) {
        const followerId = (req as any).user.id;
        const followingId = parseInt(req.params.followingId, 10);


        if (isNaN(followerId) || isNaN(followingId)) {
            return res.status(400).json({ message: 'Invalid followerId or followingId' });
        }


        try {
            const result = await followService.follow(followingId, followerId);
            res.status(200).json({ message: result.message, action: result.action });
        } catch (error) {
            const errorMessage = (error as Error).message; // Mengasumsikan bahwa error adalah instance dari Error
            res.status(500).json({ message: 'Error processing follow/unfollow', error: errorMessage });
        }
    }
}

export default new followController();