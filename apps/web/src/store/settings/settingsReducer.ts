import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ThemeSettings {
  mode: "light" | "dark"
}

export interface SettingsState {
  themeSettings: ThemeSettings
  openMenuItems: string[]
  defaultMenuItemId: string
  sidebarIsOpen: boolean
  loading: boolean
  isFullscreen: boolean
}

const initialState: SettingsState = {
  themeSettings: {
    mode: (localStorage.getItem("mode") as ThemeSettings["mode"]) ?? "light",
  },
  defaultMenuItemId: "",
  openMenuItems: [],
  sidebarIsOpen: true,
  loading: false,
  isFullscreen: false,
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const { mode } = state.themeSettings
      state.themeSettings.mode = mode === "light" ? "dark" : "light"
      localStorage.setItem("mode", mode === "light" ? "dark" : "light")
    },
    toggleSidebar: (state) => {
      state.sidebarIsOpen = !state.sidebarIsOpen
    },
    setOpenMenuItems: (state, action: PayloadAction<string>) => {
      state.openMenuItems = [action.payload]
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebarIsOpen = action.payload
    },
    toggleFullscreenMode: (state, action: PayloadAction<boolean>) => {
      state.isFullscreen = action.payload
    },
  },
})

export const {
  toggleTheme,
  setOpenMenuItems,
  toggleSidebar,
  setLoading,
  setSidebar,
  toggleFullscreenMode,
} = settingsSlice.actions

export default settingsSlice.reducer
