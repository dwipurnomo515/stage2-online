import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class followService {
    async updateFollow(currentUserId: number, targetUserId: number) {
        const follow = await prisma.follows.findFirst({
            where: {
                followerId: currentUserId,
                followingId: targetUserId
            }
        });

        if (follow) {
            await prisma.follows.delete({
                where: { id: follow.id }
            })
            return { isFollowing: false };
        } else {
            await prisma.follows.create({
                data: {
                    followerId: currentUserId,
                    followingId: targetUserId,
                    isFollowing: true,
                }
            })
            return { isFollowing: true };
        }
    }

    async getFollowStatus(currentUserId: number, targetUserId: number) {
        const follow = await prisma.follows.findFirst({
            where: {
                followerId: currentUserId,
                followingId: targetUserId,
            }
        });


        return { isFollowing: follow ? true : false };
    }

    async followList(userId: number) {
        const following = await prisma.follows.findMany({
            where: {
                followerId: userId,
            },
            include: {
                following: {
                    select: {
                        id: true,
                        fullName: true,
                        bio: true,
                        profileImage: true,
                    },
                },
            },
        });

        const followers = await prisma.follows.findMany({
            where: {
                followingId: userId,
            },
            include: {
                follower: {
                    select: {
                        id: true,
                        fullName: true,
                        bio: true,
                        profileImage: true,
                    },
                },
            },
        });
        const follows = await prisma.follows.findMany({
            where: {
                followerId: userId,
            },
        });
        console.log(follows);

        const allFollows = await prisma.follows.findMany();
        console.log("All follows in the database:", allFollows);

        const followedUser = await prisma.follows.findMany({
            where: { followerId: userId },
            select: { followingId: true },
        });

        const followedId = new Set(followedUser.map((follow) => follow.followingId));
        const followersWithIsFollow = followers.map((follow) => ({
            ...follow,
            isFollow: followedId.has(follow.follower.id),
        }));

        const followingWithIsFollow = following.map((follow) => ({
            ...follow,
            isFollow: followedId.has(follow.following.id),
        }));

        return {
            status: "success",
            data: {
                followers: followersWithIsFollow,
                following: followingWithIsFollow,
            },
        }
    }
}

export default new followService()