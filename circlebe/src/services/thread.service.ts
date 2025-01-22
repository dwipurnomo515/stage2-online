import { PrismaClient, Thread, User } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/thread.dto";
import { CustomError, CustomErrorCode } from "../types/error";
import { error } from "console";

const prisma = new PrismaClient();

class ThreadService {
  async getAllThreads(userId: number): Promise<Thread[]> {
    const threads = await prisma.thread.findMany({
      include: {
        user: true,
        replies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const threadsWithIsLiked = await Promise.all(
      threads.map(async (thread) => {
        const isLiked = await prisma.like.findFirst({
          where: {
            userId: userId,
            threadId: thread.id,
          },
        });

        return {
          ...thread,
          isLiked: !!isLiked,
        };
      })
    );

    return threadsWithIsLiked;
  }

  async getThreadById(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "Thread not found!",
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as CustomError;
    }

    return thread;
  }

  async createThread(
    data: CreateThreadDTO,
    user: User
  ): Promise<Thread | null> {
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    return await prisma.thread.create({
      data: {
        ...data,
        userId: user.id,
      },
    });
  }

  async updateThread(data: UpdateThreadDTO): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "Thread not found!",
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as CustomError;
    }

    if (data.content) {
      thread.content = data.content;
    }

    if (data.image) {
      thread.image = data.image;
    }

    return await prisma.thread.update({
      data: thread,
      where: { id: 2 },
    });
  }

  async deleteThread(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "Thread not found!",
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as CustomError;
    }

    return await prisma.thread.delete({
      where: { id },
    });
  }
}

export default new ThreadService();
