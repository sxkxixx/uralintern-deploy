import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        access: localStorage.getItem("access") ?? null,
        refresh: localStorage.getItem("refresh") ?? null,
        user: localStorage.getItem("access")
            ? jwtDecode(localStorage.getItem("access"))
            : null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { access, refresh } = action.payload;
            if (!access || !refresh) return;
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
            state.user = jwtDecode(access);
            state.access = access;
            state.refresh = refresh;
        },
        logOut: (state, action) => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.user = null;
            state.token = null;
            state.user = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
