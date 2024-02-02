import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themes: [],
    selectedThemeId: ''
}

const themesSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {
        setThemes: (state, action) => {
            state.themes = action.payload
        },
        resetThemes: (state) => {
            state.themes = []
        },

        // selected theme
        setSelectedThemesId: (state, action) => {
            state.selectedThemeId = action.payload
        },
        resetSelectedThemesId: (state, action) => {
            state.selectedThemeId = ''
        }

    }
})

export const { setThemes, resetThemes, setSelectedThemesId, resetSelectedThemesId } = themesSlice.actions
export default themesSlice.reducer;