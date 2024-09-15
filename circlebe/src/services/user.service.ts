import { PrismaClient, User } from "@prisma/client";
import { error } from "console";
import { createUserDto, updateUserDto } from "../dto/user.dto";
import createHttpError from "http-errors";




const prisma = new PrismaClient();

class userService {
    async getAllUsers(): Promise<User[]> {
        return await prisma.user.findMany();
    }
    // async getUserByid(id:number): Promise<User | null>{

    // }
    async getUserById(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw {
                status: 404,
                message: "User not found"
            }
        }
        return user;

    }

    async createUser(data: createUserDto): Promise<User | null> {
        return await prisma.user.create({ data })
    }

    async updateUser(data: updateUserDto): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: 3,
            },
        });

        if (!user) {
            throw {
                status: 404,
                message: "User not found"
            }
        }

        if (data.fullName) {
            user.fullName = data.fullName;
        }

        if (data.password) {
            user.password = data.password;
        }

        return await prisma.user.update({
            data: user,
            where: { id: 3 },
        })
    }

    async deleteUser(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new Error("User not found")
        }

        return await prisma.user.delete({
            where: { id }
        });
    }
}
export default new userService();