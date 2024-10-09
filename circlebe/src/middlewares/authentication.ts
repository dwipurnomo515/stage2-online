import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export function authentication(req: Request, res: Response, next: NextFunction) {
    /* #swagger.security = [{
         "bearerAuth": []
     }] */
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized!",
        });
    }

    const token = authorizationHeader.replace("Bearer ", "");

    try {
        const secretKey = process.env.JWT_SECRET as string;
        const decoded = Jwt.verify(token, secretKey) as Jwt.JwtPayload; // Pastikan tipe payloadnya benar

        // Pastikan token memuat userId
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Invalid token: userId not found in token" });
        }

        (req as any).user = decoded; // Tambahkan decoded (misalnya id dan email) ke req.user
        next(); // Lanjut ke handler berikutnya
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
