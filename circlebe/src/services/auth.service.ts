import { PrismaClient, User } from "@prisma/client";
import { loginDto, RegisterDTO } from "../dto/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

class authService {
    async register(data: RegisterDTO): Promise<Omit<User, "password"> | null> {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new Error("Email sudah terdaftar.");
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const { password, ...result } = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });

        return result;
    }


    async login(data: loginDto): Promise<{ user: Omit<User, "password">; token: string }> {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            throw {
                status: 404,
                message: "User not found",
            };
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password as string);

        if (!isValidPassword) {
            throw {
                status: 404,
                message: "Email / password wrong!",
            }
        }

        const { password, ...userToSign } = user;

        const secretKey = process.env.JWT_SECRET as string;

        const token = jwt.sign(userToSign, secretKey);

        return {
            user: userToSign,
            token: token,
        };

    }
}

export default new authService();