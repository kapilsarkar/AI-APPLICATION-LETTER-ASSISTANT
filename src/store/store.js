import { configureStore } from '@reduxjs/toolkit'
import applicationReducer from "../features/applicationSlice.js"

const store = configureStore({
    reducer: {
        application: applicationReducer,
    }
})

export default store;