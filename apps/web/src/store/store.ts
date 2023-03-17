import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authReducer"
import settingsReducer from "./settings/settingsReducer"

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
