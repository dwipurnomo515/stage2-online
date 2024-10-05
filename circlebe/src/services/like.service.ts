import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LikeService {
    // Method untuk toggle like
    async toggleLike(userId: number, threadId: number) {
        // Cek apakah user sudah like thread
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: userId,
                threadId: threadId,
            },
        });

        if (existingLike) {
            // Jika sudah di-like, hapus like (unlike)
            await prisma.like.delete({
                where: { id: existingLike.id },
            });

            // Kurangi jumlah likes pada thread
            await prisma.thread.update({
                where: { id: threadId },
                data: {
                    likesCount: {
                        decrement: 1,
                    },
                },
            });
        } else {
            // Jika belum di-like, tambahkan like
            await prisma.like.create({
                data: {
                    userId: userId,
                    threadId: threadId,
                },
            });

            // Tambahkan jumlah likes pada thread
            await prisma.thread.update({
                where: { id: threadId },
                data: {
                    likesCount: {
                        increment: 1,
                    },
                },
            });
        }

        // Ambil jumlah likes terbaru untuk thread
        const updatedThread = await prisma.thread.findUnique({
            where: { id: threadId },
            select: {
                likesCount: true,
            },
        });

        return {
            message: existingLike ? 'Thread unliked' : 'Thread liked',
            isLiked: !existingLike,
            likesCount: updatedThread?.likesCount // Kembalikan likesCount terbaru
        };
    }

    // Method untuk mengecek apakah user telah like thread
    async isThreadLikedByUser(userId: number, threadId: number) {
        const like = await prisma.like.findFirst({
            where: {
                userId: userId,
                threadId: threadId,
            },
        });
        return !!like; // Kembalikan true jika sudah di-like, false jika belum
    }
}


export default new LikeService();
