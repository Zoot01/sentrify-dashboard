import { Components, Theme } from "@mui/material"
import "@mui/material/Button"

const MuiPaper = (theme: Theme): Components["MuiPaper"] => {
  return {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  }
}

export default MuiPaper
