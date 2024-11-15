import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import cartSlice from "./cart/cartSlice";

export const store = configureStore({
    reducer: {
        user : userReducer,
        cart : cartSlice,
    },
})