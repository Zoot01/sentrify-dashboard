import { PaletteOptions } from "@mui/material/styles/createPalette";
declare module "@mui/material/styles" {
  // base overides
  interface Theme {}
  // allow configuration using `createTheme`
  interface ThemeOptions {}
}

declare module "@mui/material/styles/createPalette" {
  export interface TypeText {
    icon?: string;
  }
}
