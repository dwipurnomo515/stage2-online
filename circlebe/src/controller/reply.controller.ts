import { Request, Response } from 'express';
import replyService from '../services/reply.service';
import cloudinaryService from '../services/cloudinary.service';

class ReplyController {
    // Method untuk mengambil semua reply berdasarkan threadId
    async getReplyByPost(req: Request, res: Response) {
        const threadId = Number(req.params.threadId);
        try {
            const reply = await replyService.getRepliesByThreadId(threadId);
            return res.json(reply);
        } catch (error) {
            console.error('Error fetching replies:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Method untuk membuat reply
    async createReply(req: Request, res: Response) {
        const threadId = Number(req.params.threadId);
        const userId = (req as any).user.id;
        let imageUrl: string | undefined;

        try {
            if (req.file) {
                const image = await cloudinaryService.uploadSingle(req.file);
                imageUrl = image.secure_url;
            }

            // Buat body dengan content dan image
            const body = { content: req.body.content, image: imageUrl || null };

            // Memanggil metode replyToThread dengan 3 argumen
            const createReply = await replyService.replyToThread(threadId, userId, body);
            return res.status(201).json(createReply);
        } catch (error) {
            console.error('Error creating reply:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default new ReplyController();
