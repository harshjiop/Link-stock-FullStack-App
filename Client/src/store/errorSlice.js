import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: false,
    status: false,
    text: ''

}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        updateStatus: (state, actions) => {
            state.error = actions.payload.error;
            state.text = actions.payload.text;
            state.status = true;
        },
        clearStatus: (state) => {
            state.status = false,
                state.text = '',
                state.error = false
        }
    }
})

export const { updateStatus, clearStatus } = errorSlice.actions

export default errorSlice.reducer;