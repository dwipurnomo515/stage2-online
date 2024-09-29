import { SocialConnection } from "./social-connection";
export interface UserEntity {
    id: number;
    fullName: string;
    email: string;
    image: string;
    password: string;
    socialConnection: SocialConnection;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
