import { SocialConnection } from "./social-connection";
import { ThreadEntity } from "./thread";

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
    following: number;
    followers: number;
    createdAt: Date;
    updatedAt: Date;
    threads: ThreadEntity[];


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