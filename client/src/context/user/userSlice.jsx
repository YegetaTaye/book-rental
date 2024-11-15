import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("token");
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null; 

const initialState = {
    user: user ? user : null,
    token: token ? token : null,
}
//user ? user : null,
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }, 
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const {setUser, setToken, clearUser} = userSlice.actions;
export default userSlice.reducer;