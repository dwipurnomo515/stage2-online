import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
export var store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
