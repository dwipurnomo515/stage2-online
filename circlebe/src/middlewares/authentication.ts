import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken"




export function authentication(
    req: Request,
    res: Response,
    next: NextFunction
) {
    /* #swagger.security = [{
         "bearerAuth": []
 }] */
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(404).json({
            message: "Unauthorizated!",
        });
    }

    const token = authorizationHeader.replace("Bearer ", "");


    if (!token) {
        return res.status(401).json({
            message: "Authorization token not found"
        });

    }
    try {
        const secretKey = process.env.JWT_SECRET as string;
        const decoded = Jwt.verify(token, secretKey);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}