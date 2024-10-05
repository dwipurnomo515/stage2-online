import { Request, Response } from 'express';
import replyService from '../services/reply.service';

export const ReplyController = async (req: Request, res: Response) => {
    const threadId = Number(req.params.threadId); // Ambil threadId dari parameter URL
    const { content } = req.body;
    const userId = (req as any).user.id; // Ambil userId dari req.user


    // Validasi userId
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const image = req.file?.path || null; // Mengambil URL gambar dari req.file jika ada

    // Validasi input
    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    // Validasi dan konversi threadId
    if (isNaN(threadId) || threadId <= 0) {
        return res.status(400).json({ message: 'Invalid threadId' });
    }

    try {
        const reply = await replyService.replyToThread(threadId, userId, content, image);
        return res.status(201).json(reply);
    } catch (error) {
        let errorMessage = 'Internal Server Error';

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error('Error creating reply:', errorMessage);
        return res.status(500).json({ message: errorMessage });
    }
};
