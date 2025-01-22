import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ReplyService {
  async replyToThread(
    threadId: number,
    userId: number,
    body: { content: string; image?: string | null }
  ) {
    const { content, image } = body; // Mengambil content dan image dari body

    const reply = await prisma.reply.create({
      data: {
        content, // Harus ada
        image: image || null, // Boleh null, menggunakan null jika tidak ada image
        thread: {
          connect: {
            id: threadId, // Menghubungkan dengan thread berdasarkan threadId
          },
        },
        user: {
          connect: {
            id: userId, // Menghubungkan dengan user berdasarkan userId
          },
        },
      },
    });
    return reply;
  }

  async getRepliesByThreadId(threadId: number, userId: number) {
    try {
      const replies = await prisma.reply.findMany({
        where: { threadId },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              profileImage: true,
            },
          },
          replylike: true, // Ambil semua likes pada reply
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // Proses replies untuk menambahkan likesCount dan isLiked
      const processedReplies = replies.map((reply) => {
        const likesCount = reply.replylike.length; // Hitung jumlah likes
        const isLiked = reply.replylike.some((like) => like.userId === userId); // Cek apakah user sudah like

        return {
          ...reply,
          likesCount,
          isLiked,
        };
      });

      return processedReplies;
    } catch (error) {
      console.error("Error fetching replies with like status:", error);
      throw new Error("Could not fetch replies.");
    }
  }
  async toggleLikeReply(replyId: number, userId: number) {
    console.log("userId in service:", userId); // Pastikan ID ini juga 1

    try {
      const reply = await prisma.reply.findUnique({
        where: { id: replyId },
      });

      if (!reply) {
        console.log(`Reply with id ${replyId} not found.`);
        return { message: "Reply not found" };
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        console.log(`User with id ${userId} not found.`);
        return { message: "User not found" };
      }

      // Cek jika like sudah ada
      const existingLike = await prisma.replyLike.findUnique({
        where: {
          userId_replyId: { userId, replyId },
        },
      });

      if (existingLike) {
        await prisma.replyLike.delete({
          where: { id: existingLike.id },
        });

        const likesCount = await prisma.replyLike.count({
          where: { replyId },
        });

        return {
          message: "Like removed",
          isLiked: false,
          likesCount,
        };
      } else {
        await prisma.replyLike.create({
          data: {
            userId,
            replyId,
          },
        });

        const likesCount = await prisma.replyLike.count({
          where: { replyId },
        });

        return {
          message: "Like added",
          isLiked: true,
          likesCount,
        };
      }
    } catch (error) {
      console.error("Error toggling like on reply:", error);
      return { message: "An error occurred while processing your request." };
    }
  }
}

export default new ReplyService();
