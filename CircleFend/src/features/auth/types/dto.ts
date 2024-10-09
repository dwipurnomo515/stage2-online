import { UpdateUserEntity, UserEntity } from "../../../entities/user";

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
    userName: string;
    bio: string;
};

export type RegisterRequestDTO = Pick<
    UserEntity,
    "fullName" | "email" | "password"
>;

// export type RegisterResponseDTO = LoginResponseDTO;
export type UserStoreDTO = Omit<
    UserEntity,
    'password' | 'image' | 'socialConnection' | 'createdAt' | 'updatedAt'
>;
export type UserDTO = UpdateUserEntity;

export type UpdateUserDTO = Pick<
    UserDTO,
    'fullName' | 'userName' | 'bio' | 'profileImage' | 'backgroundImage'
>;