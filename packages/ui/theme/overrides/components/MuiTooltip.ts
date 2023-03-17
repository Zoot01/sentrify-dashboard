import { alpha, Components, Theme } from "@mui/material";
import "@mui/material/Button";

const MuiTooltip = (theme: Theme): Components["MuiTooltip"] => {
  return {
    styleOverrides: {
      tooltip: {
        background:
          theme.palette.mode === "light"
            ? alpha(theme.palette.common.black, 0.45)
            : alpha(theme.palette.common.white, 0.1),
      },
    },
  };
};

export default MuiTooltip;
