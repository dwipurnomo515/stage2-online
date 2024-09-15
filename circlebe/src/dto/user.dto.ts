export type createUserDto = {
    fullName: string;
    email: string;
    password: string;
}

export type updateUserDto = Omit<createUserDto, "email">