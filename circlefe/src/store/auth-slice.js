var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
import { createSlice } from "@reduxjs/toolkit";
var initialState = {};
var authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: function (state, action) {
            var _a = action.payload, id = _a.id, fullName = _a.fullName, email = _a.email, role = _a.role;
            if (id && fullName && email && role) {
                return __assign(__assign({}, state), { id: id, fullName: fullName, email: email, role: role });
            }
            else {
                console.error("Invalid user data:", action.payload);
                return state; // Kembali ke state lama jika data tidak valid
            }
        },
        removeUser: function () {
            return {};
        },
    },
});
export var setUser = (_a = authSlice.actions, _a.setUser), removeUser = _a.removeUser;
export default authSlice.reducer;
