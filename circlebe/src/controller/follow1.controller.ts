import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import follow1Service from "../services/follow1.service";
import { any } from "joi";

const prisma = new PrismaClient();

class FollowController {
    async toggleFollow(req: Request, res: Response) {
        const currentUserId = (req as any).user.id;
        const targetUserId = parseInt(req.params.userId);
        const followStatus = await follow1Service.updateFollow(targetUserId, currentUserId);
        return res.json(followStatus);
    }

    async checkFollowStatus(req: Request, res: Response) {
        const currentUserId = (req as any).user.id;
        const targetUserId = parseInt(req.params.userId);
        const followStatus = await follow1Service.getFollowStatus(targetUserId, currentUserId);
        return res.json(followStatus);
    }

    async followList(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            console.log(userId);

            const follows = await follow1Service.followList(userId);
            res.json(follows)
        } catch (error) {

        }
    }
}

export default new FollowController()


