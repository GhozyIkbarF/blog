import { configureStore } from "@reduxjs/toolkit";
import stateSliceReducer from "./Utlis"

// Define your RootState type based on the reducer
export type RootState = ReturnType<typeof stateSliceReducer>;

const store = configureStore({
  reducer: {
    utils: stateSliceReducer, 
  },
});

export default store;
