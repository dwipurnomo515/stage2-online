import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ReplyService {
    async replyToThread(threadId: number, userId: number, body: { content: string; image?: string | null }) {
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

    async getRepliesByThreadId(threadId: number) {
        const replies = await prisma.reply.findMany({
            where: {
                threadId: threadId, // Mencari berdasarkan threadId
            },
            include: {
                user: true, // Menyertakan informasi user yang melakukan reply
            },
        });
        return replies;
    }
}

export default new ReplyService();
