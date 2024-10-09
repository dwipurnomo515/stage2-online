import { SocialConnection } from "./social-connection";

export interface UserEntity {
    id: number;
    fullName: string;
    userName: string;
    email: string;
    profileImage?: string;   // Tambahkan profileImage
    backgroundImage?: string; // Tambahkan backgroundImage
    bio: string;
    password: string;
    socialConnection: SocialConnection;
    role: string;
    createdAt: Date;
    updatedAt: Date;


}

export interface UpdateUserEntity {
    id: number;
    email: string;
    password: string;
    fullName?: string;
    userName?: string;
    bio?: string;
    profileImage?: FileList;
    backgroundImage?: FileList;
    following: number;
    followers: number;
    createdAt: Date;
    updatedAt: Date;

}