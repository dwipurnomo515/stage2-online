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
        const followStatus = await follow1Service.getFollowStatus(currentUserId, targetUserId);
        return res.json(followStatus);
    }
}

export default new FollowController()


