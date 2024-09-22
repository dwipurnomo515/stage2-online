import Joi from "joi";
import { loginDto, RegisterDTO } from "../../dto/auth.dto";

export const loginSchema = Joi.object<loginDto>({
    email: Joi.string().email(),
    password: Joi.string(),
});

export const registerSchema = Joi.object<RegisterDTO>({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
});