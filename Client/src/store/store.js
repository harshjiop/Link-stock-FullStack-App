import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import linksSlice from "./linksSlice";
import errorSlice from "./errorSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        links: linksSlice,
        errors: errorSlice
    }
})

export default store;