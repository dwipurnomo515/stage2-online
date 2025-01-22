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
        },
      },
    });

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    const isLiked = thread.likes && thread.likes.length > 0;
    const likesCount = thread.likes ? thread.likes.length : 0;
    res.json({ isLiked, likesCount });
  }

  async likeThread(req: Request, res: Response) {
    const threadId = parseInt(req.params.threadId);
    const userId = (req as any).user.id;

    const checkLike = await prisma.like.findUnique({
      where: { userId_threadId: { threadId, userId } },
    });

    let isLiked = false;

    if (checkLike) {
      // Jika sudah di-like, hapus like dan kurangi likesCount
      await prisma.like.delete({
        where: { id: checkLike.id },
      });
      await prisma.thread.update({
        where: { id: threadId },
        data: { likesCount: { decrement: 1 } },
      });
    } else {
      // Jika belum di-like, tambahkan like dan tingkatkan likesCount
      await prisma.like.create({
        data: { threadId, userId },
      });
      await prisma.thread.update({
        where: { id: threadId },
        data: { likesCount: { increment: 1 } },
      });
      isLiked = true;
    }

    // Ambil data terbaru dari thread
    const updatedThread = await prisma.thread.findUnique({
      where: { id: threadId },
      select: {
        id: true,
        likesCount: true,
      },
    });

    if (!updatedThread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // Kembalikan data yang lengkap
    return res.json({
      message: isLiked ? "Like added" : "Like removed",
      thread: {
        id: updatedThread.id,
        likesCount: updatedThread.likesCount,
        isLiked,
      },
    });
  }
}

export default new likeController();
