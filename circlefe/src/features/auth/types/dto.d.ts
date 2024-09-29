import { UserEntity } from "../../../entities/user";
export type LoginRequestDTO = Pick<UserEntity, "email" | "password">;
export type LoginResponseDTO = {
    user: UserEntity;
    token: string;
};
export type RegisterResponseDTO = {
    id: number;
    email: string;
    fullName: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};
export type RegisterRequestDTO = Pick<UserEntity, "fullName" | "email" | "password">;
export type UserStoreDTO = Omit<UserEntity, 'password' | 'image' | 'socialConnection' | 'createdAt' | 'updatedAt'>;
