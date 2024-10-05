import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStoreDTO } from "../features/auth/types/dto";
import Cookies from "js-cookie";

const initialState: UserStoreDTO = Cookies.get("user") ? JSON.parse(Cookies.get("user") || "{}") : {} as UserStoreDTO;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserStoreDTO>) {
            const { id, fullName, email, role } = action.payload;
            if (id && fullName && email && role) {
                const userData = {
                    id,
                    fullName,
                    email,
                    role,
                };
                Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Simpan ke cookies
                return userData; // Kembalikan state baru
            } else {
                console.error("Invalid user data:", action.payload);
                return state; // Kembali ke state lama jika data tidak valid
            }
        },

        removeUser() {
            Cookies.remove("user"); // Hapus data dari cookies
            return {} as UserStoreDTO;
        },
    },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
