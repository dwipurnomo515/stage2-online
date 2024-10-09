import Joi from "joi"
import { createUserDto, updateUserDto } from "../../dto/user.dto"


export const createUserSchema = Joi.object<createUserDto>({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
});



export const updateUserSchema = Joi.object<updateUserDto>({
    fullName: Joi.string().min(3).max(100),
    userName: Joi.string().min(3).max(100),
    bio: Joi.string().min(3).max(100),
    profileImage: Joi.string().optional().allow(null, ''),
    backgroundImage: Joi.string().optional().allow(null, ''),
})