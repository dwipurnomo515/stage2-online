import { PrismaClient, User } from "@prisma/client";
import { loginDto, RegisterDTO } from "../dto/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "./mail.service";

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

  async login(
    data: loginDto
  ): Promise<{ user: Omit<User, "password">; token: string }> {
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

    const isValidPassword = await bcrypt.compare(
      data.password,
      user.password as string
    );

    if (!isValidPassword) {
      throw {
        status: 404,
        message: "Email / password wrong!",
      };
    }

    const { password, ...userToSign } = user;

    const secretKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(userToSign, secretKey);
    console.log("ini token dan user", user, token);

    return {
      user: userToSign,
      token: token,
    };
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET || "dwqbwndvjhqwvdq",
      {
        expiresIn: "1d",
      }
    );

    await sendEmail(email, token);
    return "success";
  }

  async resetPassword(token: string, password: string) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dwqjkbqwdjkq"
    ) as { email: string };
    if (!decoded) {
      throw new Error("Invalid token");
    }

    const email = decoded.email;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}

export default new authService();
