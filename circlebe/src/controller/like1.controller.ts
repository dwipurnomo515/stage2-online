import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Request, Response } from "express";





const prisma = new PrismaClient();


class likeController {
    async getLikes(req: Request, res: Response) {
        const threadId = parseInt(req.params.threadId);
        const userId = (req as any).user.id;
        const thread = await prisma.thread.findUnique({
            where: { id: threadId },
            include: {
                likes: {
                    where: { userId },
                }
            }
        })

        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }

        const isLiked = thread.likes && thread.likes.length > 0;
        const likesCount = thread.likes ? thread.likes.length : 0;
        res.json({ isLiked, likesCount });

    }


    async likeThread(req: Request, res: Response) {
        const threadId = parseInt(req.params.threadId);
        const userId = (req as any).user.id;
        const checkLike = await prisma.like.findUnique({
            where: { userId_threadId: { threadId, userId } }
        })

        if (checkLike) {
            await prisma.like.delete({
                where: { id: checkLike.id },
            });
            await prisma.thread.update({
                where: { id: threadId },
                data: { likesCount: { decrement: 1 } },
            })
            return res.json({ message: 'Like removed' });
        } else {
            await prisma.like.create({
                data: { threadId, userId },
            });
            await prisma.thread.update({
                where: { id: threadId },
                data: {
                    likesCount: { increment: 1 }
                },
            });
            return res.json({ message: 'Like added' })
        }
    }

}

export default new likeController()