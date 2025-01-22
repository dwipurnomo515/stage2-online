import { Request, Response } from "express";
import replyService from "../services/reply.service";
import cloudinaryService from "../services/cloudinary.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ReplyController {
  // Method untuk mengambil semua reply berdasarkan threadId
  async getReplyByPost(req: Request, res: Response) {
    const threadId = Number(req.params.threadId);
    const userId = (req as any).user.id;
    try {
      const reply = await replyService.getRepliesByThreadId(threadId, userId);
      return res.json(reply);
    } catch (error) {
      console.error("Error fetching replies:", error);
      return res.status(500).json({ message: "Internal Server Error" });
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
      const createReply = await replyService.replyToThread(
        threadId,
        userId,
        body
      );
      return res.status(201).json(createReply);
    } catch (error) {
      console.error("Error creating reply:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async toggleLikeReply(req: Request, res: Response) {
    const replyId = +req.params.replyId;
    const userId = +(req as any).user.id;

    try {
      const result = await replyService.toggleLikeReply(replyId, userId);
      return res.json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error processing like/unlike", error });
    }
  }

  async getReplyLikes(req: Request, res: Response) {
    try {
      const replyId = Number(req.params.replyId);
      const userId = (req as any).user.id;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const existingLike = await prisma.replyLike.findFirst({
        where: {
          replyId: replyId,
          userId: userId,
        },
      });

      const likesCount = await prisma.replyLike.count({
        where: {
          replyId: replyId,
        },
      });

      return res.json({
        likesCount,
        isLiked: !!existingLike,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }
}

export default new ReplyController();
