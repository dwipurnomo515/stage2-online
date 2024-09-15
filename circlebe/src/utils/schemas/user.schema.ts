import Joi from "joi"
import { createUserDto } from "../../dto/user.dto"


export const createUserSchema = Joi.object<createUserDto>({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
});