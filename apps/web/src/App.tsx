import { CssBaseline, ThemeProvider } from "@mui/material"
import { useCallback, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { toggleFullscreenMode } from "store/settings/settingsReducer"
import theme from "ui/theme/theme"
import Routes from "./routes"
import { AppDispatch, RootState } from "./store/store"
import ReactHotToastWrapper from "./styles/ReactHotToastWrapper"

function App() {
  // Hooks
  const { settings } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const fullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      dispatch(toggleFullscreenMode(false))
    }
  }, [dispatch, settings.isFullscreen])

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (settings.isFullscreen) {
        document.body.requestFullscreen()
      }
      if (!settings.isFullscreen && document.fullscreenElement) {
        document.exitFullscreen()
      }
    }

    window.addEventListener("fullscreenchange", fullScreen)
    return () => {
      window.removeEventListener("fullscreenchange", fullScreen)
    }
  }, [settings.isFullscreen, fullScreen])

  return (
    <ThemeProvider theme={theme({ mode: settings.themeSettings.mode })}>
      <CssBaseline />
      <Routes />
      <ReactHotToastWrapper>
        <Toaster position="bottom-center" toastOptions={{ className: "react-hot-toast" }} />
      </ReactHotToastWrapper>
    </ThemeProvider>
  )
}

export default App
