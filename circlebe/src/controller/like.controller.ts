import { Request, Response } from 'express';
import likeService from '../services/like.service';


// Controller untuk toggle like/unlike
export async function toggleLikeController(req: Request, res: Response) {
    const { userId, threadId } = req.params;


    try {
        const result = await likeService.toggleLike(parseInt(userId), parseInt(threadId));
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error processing like/unlike', error });
    }
}

// Controller untuk mengecek apakah user sudah like thread
export async function checkIsLikedController(req: Request, res: Response) {
    const { userId, threadId } = req.params;

    try {
        const isLiked = await likeService.toggleLike(parseInt(userId), parseInt(threadId));


        return res.json({ isLiked });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching like status', error });
    }
}
