import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    storeOwner: null
}

const storeSlice = createSlice({
    name: 'storeSlice',
    initialState,
    reducers: {
        addStoreOwner: (state, action) => {
            state.storeOwner = action.payload;
        },
        removeStoreOwner: (state) => {
            state.storeOwner = null;
        }
    }
})

export const { addStoreOwner, removeStoreOwner } = storeSlice.actions;
export default storeSlice.reducer;