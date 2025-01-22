export type SuggestedUser = {
    id: number;
    fullName: string;
    userName: string;
    email: string;
    profileImage: string | null; // Tipe nullable jika bisa null
    isFollowing: boolean; // Tambahkan properti ini

};
