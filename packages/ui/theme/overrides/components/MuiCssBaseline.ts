import { Components, Theme } from "@mui/material";
import "@mui/material/Button";

const MuiCssBaseline = (theme: Theme): Components["MuiCssBaseline"] => {
  return {
    styleOverrides: {
      // used to make all grid items the same height
      "&.match-height": {
        "& .MuiCard-root": {
          height: "100%",
        },
      },
    },
  };
};

export default MuiCssBaseline;
