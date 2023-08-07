import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { AuthApi, uralInernApi } from "./authApi";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [uralInernApi.reducerPath]: uralInernApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(uralInernApi.middleware)
            .concat(AuthApi.middleware),
});
