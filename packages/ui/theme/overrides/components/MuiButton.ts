import { Components, Theme } from "@mui/material"
import "@mui/material/Button"

const MuiButton = (theme: Theme): Components["MuiButton"] => {
  return {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
    },
  }
}

export default MuiButton
