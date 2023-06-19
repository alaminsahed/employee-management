import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/auth/loginSlice";

export const store = configureStore({
  reducer: {
    userLogin: loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
