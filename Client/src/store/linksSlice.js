import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    links: [],
}

const linksSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {
        setLinks: (state, action) => {
            state.links = action.payload;
        },
        resetLinks:(state)=>{
            state.links = []
        }
    }
})

export const { setLinks,resetLinks } = linksSlice.actions;

export default linksSlice.reducer;
