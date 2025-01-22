import { PrismaClient, User } from "@prisma/client";
import { error } from "console";
import { createUserDto, SuggestedUser, updateUserDto } from "../dto/user.dto";
import createHttpError from "http-errors";

const prisma = new PrismaClient();

class userService {
  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }
  async getSuggestedUsers(userId: number): Promise<SuggestedUser[]> {
    const users = await prisma.user.findMany({
      where: {
        NOT: [
          { id: userId },
          {
            followers: {
              some: { followerId: userId },
            },
          },
        ],
      },
      take: 5,
      select: {
        id: true,
        fullName: true,
        email: true,
        profileImage: true,
      },
    });

    const followingId = await prisma.follows.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingSet = new Set(
      followingId.map((follow) => follow.followingId)
    );
    const suggestedUsersWithFollowingStatus = users.map((user) => ({
      ...user,
      isFollowing: followingSet.has(user.id), // Cek apakah pengguna sedang mengikuti
    }));
    console.log(
      "Suggested users with following status:",
      suggestedUsersWithFollowingStatus
    ); // Cek hasil di sini

    // Mengembalikan hasil akhir
    return suggestedUsersWithFollowingStatus;
  }

  // async getUserByid(id:number): Promise<User | null>{

  // }
  async getUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
        followers: true,
        following: true,
        threads: {
          select: {
            id: true,
            content: true,
            image: true,
            likesCount: true,
            repliesCount: true,
          },
        },
      },
    });

    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
    }
    return user;
  }

  async getUser(userId: number): Promise<
    | (Omit<User, "password"> & {
        _count: { followers: number; following: number };
      })
    | null
  > {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        fullName: true,
        userName: true,
        bio: true,
        threads: {
          select: {
            id: true,
            content: true,
            image: true,
            likesCount: true,
            repliesCount: true,
            createdAt: true,
            user: {
              select: {
                userName: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
        email: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },

        followers: {
          select: {
            follower: {
              select: {
                id: true,
                fullName: true,
                email: true,
                bio: true,
                profileImage: true,
              },
            },
          },
        },
        following: {
          select: {
            following: {
              select: {
                id: true,
                fullName: true,
                email: true,
                bio: true,
                profileImage: true,
              },
            },
          },
        },
        role: true,
        createdAt: true,
        updatedAt: true,
        profileImage: true,
        backgroundImage: true,
      },
    });
    console.log("Fetched user:", user);
    console.log("Followers:", user?.followers);
    console.log("Following:", user?.following);
    return user;
  }

  async createUser(data: createUserDto): Promise<User | null> {
    return await prisma.user.create({ data });
  }

  async updateUser(
    id: number,
    data: updateUserDto
  ): Promise<{
    user: Pick<
      User,
      "fullName" | "bio" | "profileImage" | "userName" | "backgroundImage"
    > | null;
  }> {
    // console.log('Updating user with ID:', id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.log("User not found");
      throw new Error("User not found");
    }

    // console.log('Current user data:', user);
    // console.log('Data yang diterima untuk pembaruan:', data);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        fullName: data.fullName || user.fullName, // fallback to existing value if not provided
        userName: data.userName || user.userName, // fallback to existing value if not provided
        bio: data.bio || user.bio, // fallback to existing value if not provided
        profileImage: data.profileImage || user.profileImage, // fallback to existing value if not provided
        backgroundImage: data.backgroundImage || user.backgroundImage, // fallback to existing value if not provided
      },
      select: {
        id: true,
        fullName: true,
        userName: true,
        bio: true,
        profileImage: true,
        backgroundImage: true,
      },
    });

    console.log("Updated user:", updatedUser);
    // console.log('Data setelah update di database:', updatedUser);

    return {
      user: updatedUser,
    };
  }

  async searchUser(query: string): Promise<User[]> {
    const user = await prisma.user.findMany({
      where: {
        OR: [
          { userName: { contains: query, mode: "insensitive" } },
          { fullName: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    });

    return user;
  }

  async deleteUser(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await prisma.user.delete({
      where: { id },
    });
  }
}
export default new userService();
