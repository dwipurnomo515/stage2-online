import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../utils/schemas/auth.schema";
import authService from "../services/auth.service";
import exp from "constants";
import Joi from "joi";





class authController {
    async login(req: Request, res: Response) {
        /*  #swagger.requestBody = {
         required: true,
         content: {
             "application/json": {
                 schema: {
                     $ref: "#/components/schemas/LoginDTO"
                 }  
             }
         }
     } 
 */
        try {
            const value = await loginSchema.validateAsync(req.body);
            const user = await authService.login(value);
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    }

    async register(req: Request, res: Response) {
        /*  #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/RegisterDTO"
                  }  
              }
          }
      } 
  */
        try {
            const value = await registerSchema.validateAsync(req.body);
            const user = await authService.register(value);
            res.json(user);
        } catch (error: unknown) {
            if (error instanceof Joi.ValidationError) {
                return res.status(400).json({ message: error.details[0].message });
            }

            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            res.status(500).json({ message: "Terjadi kesalahan yang tidak terduga." });
        }
    }
    async check(req: Request, res: Response) {
        try {
            const user = (req as any).user;
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    }
}

export default new authController();