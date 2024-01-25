import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import linksSlice from "./linksSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        links: linksSlice
    }
})

export default store;