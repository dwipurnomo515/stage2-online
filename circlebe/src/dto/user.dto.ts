export type createUserDto = {
    fullName: string;
    email: string;
    password: string;
}

// src/types/User.ts
export type SuggestedUser = {
    id: number;
    fullName: string;
    email: string;
    profileImage: string | null; // Tipe nullable jika bisa null
    isFollowing: boolean;

};

// src/types/updateUser.ts
export type updateUserDto = {
    fullName?: string;
    userName?: string;
    bio?: string | null;
    profileImage?: string | null;
    backgroundImage?: string | null;
};
