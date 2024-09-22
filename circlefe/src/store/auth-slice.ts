import { UserStoreDTO } from "@/features/auth/types/dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: UserStoreDTO = {} as UserStoreDTO;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserStoreDTO>) {
            const { id, fullName, email, role } = action.payload;
            if (id && fullName && email && role) {
                return {
                    ...state,
                    id,
                    fullName,
                    email,
                    role,
                };
            } else {
                console.error("Invalid user data:", action.payload);
                return state; // Kembali ke state lama jika data tidak valid
            }
        },

        removeUser() {
            return {} as UserStoreDTO;
        },
    },


});
export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;