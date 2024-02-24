import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
    verifyEmail: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false,
                state.userData = null;
        },
        setVerifyEmail: (state, action) => {
            state.verifyEmail = action.payload
        },
        resetVerifyEmail: (state) => {
            state.verifyEmail = null
        }
    }
})

export const { login, logout,setVerifyEmail,resetVerifyEmail } = authSlice.actions;

export default authSlice.reducer;