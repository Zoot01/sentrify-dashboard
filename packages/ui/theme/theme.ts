import { createTheme } from "@mui/material";
import MuiOverides from "./overrides";
import { ThemeOptionsType } from "./types";

const darkBackground = "#0E1320";
const darkPaperBackground = "#111927";
const lightBackground = "#FFFFFF";
const lightPaperBackground = "#FFFFFF";

const theme = (options: ThemeOptionsType) => {
  const theme = createTheme({
    direction: "ltr",
    typography: {
      fontFamily: "Poppins",
    },
    palette: {
      mode: options.mode,
      background: {
        default: options.mode === "light" ? lightBackground : darkBackground,
        paper:
          options.mode === "light" ? lightPaperBackground : darkPaperBackground,
      },
      primary: {
        main: "#4F46E5",
      },
      secondary: {
        main: "#6861E6",
      },
      text: {
        primary: options.mode === "light" ? "#000000" : "rgb(237, 242, 247)",
        secondary:
          options.mode === "light"
            ? "rgb(108, 115, 127)"
            : "rgb(160, 174, 192)",
      },
    },
    breakpoints: {
      keys: ["xs", "sm", "md", "lg", "xl"],
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
      unit: "px",
    },
  });

  theme.components = MuiOverides(theme);

  return theme;
};

export default theme;
