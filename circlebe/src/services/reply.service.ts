import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ReplyService {
    async replyToThread(threadId: number, userId: number, content: string, imageUrl?: string | null) {
        const reply = await prisma.reply.create({
            data: {
                content, // Harus ada
                image: imageUrl, // Boleh null
                thread: {
                    connect: {
                        id: threadId,
                    },
                },
                user: {
                    connect: {
                        id: userId, // Gunakan userId yang sudah divalidasi
                    },
                },
            },
        });
        return reply;
    }
}

export default new ReplyService();
