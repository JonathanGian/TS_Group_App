import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./countSlice";
// Creates a store that merges all slices together
export const store = configureStore({
    reducer: {
        state : stateReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

// Type for the Action
export type AppDispatch = typeof store.dispatch;