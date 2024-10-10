import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";


const prisma = new PrismaClient();


class followService {
    async follow(followerId: number, followingId: number) {
        // Pastikan followerId dan followingId adalah angka
        if (isNaN(followerId) || isNaN(followingId)) {
            throw new Error('Invalid followerId or followingId');
        }
        const existingFollow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: { followerId, followingId },
            },
        });

        if (existingFollow) {
            await prisma.follows.delete({
                where: {
                    id: existingFollow.id,
                },
            });

            return { action: 'unfollow', message: 'unfollowedSuccess' };
        } else {
            await prisma.follows.create({
                data: {
                    followerId,
                    followingId
                },
            });

            return { action: 'follow', message: 'followsuccess' }
        }
    }

}


export default new followService();