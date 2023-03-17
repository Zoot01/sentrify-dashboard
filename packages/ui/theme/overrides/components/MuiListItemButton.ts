import { Components, Theme } from "@mui/material"

const MuiListItemButton = (theme: Theme): Components["MuiListItem"] => {
  return {
    styleOverrides: {
      root: {
        "&:hover": {
          background:
            theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)",
        },
        "&.Mui-selected": {
          background:
            theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)",
          "&:hover": {
            background:
              theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)",
          },
        },
      },
    },
  }
}

export default MuiListItemButton
