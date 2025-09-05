import { createSlice } from '@reduxjs/toolkit';

//If checked remember me then user will be stored in localStorage
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    sessionUser: JSON.parse(sessionStorage.getItem("users")) || null,
};

const userSessionSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLocalUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        removeLocalUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
        setSessionUser: (state, action) => {
            state.sessionUser = action.payload;
            sessionStorage.setItem("users", JSON.stringify(action.payload));
        },
        removeSessionUser: (state) => {
            state.sessionUser = null;
            sessionStorage.removeItem("users");
        },
    },
});



export const {
    setLocalUser,
    removeLocalUser,
    setSessionUser,
    removeSessionUser,
} = userSessionSlice.actions;

export default userSessionSlice.reducer;

//Saves numper of login attempts and time of last login
export const setLoginData = (data) => localStorage.setItem("loginData" + data.userName, JSON.stringify(data));

export const getLoginData = (data) => localStorage.getItem("loginData" + data.userName) ? localStorage.getItem("loginData" + data.userName) : null;