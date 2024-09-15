import { Request, Response } from "express"
import userService from "../services/user.service";


class userController {
    async find(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.json(error);

        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const users = await userService.getUserById(Number(id));
            res.json(users);
        } catch (error) {

            res.json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const users = await userService.createUser(req.body);
            res.json(users);
        } catch (error) {
            res.json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const users = await userService.updateUser(req.body);
            res.json(users);
        } catch (error) {
            res.json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const users = await userService.deleteUser(Number(id));
            res.json(users);
        } catch (error) {
            res.json(error);
        }
    }
}

export default new userController();