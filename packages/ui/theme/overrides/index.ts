import { Theme } from "@mui/material";
import MuiButton from "./components/MuiButton";
import MuiCard from "./components/MuiCard";
import MuiCssBaseline from "./components/MuiCssBaseline";
import MuiListItemButton from "./components/MuiListItemButton";
import MuiOutlinedInput from "./components/MuiOutlinedInput";
import MuiPaper from "./components/MuiPaper";
import MuiTooltip from "./components/MuiTooltip";

const MuiOverides = (theme: Theme) => {
  return Object.assign({
    MuiButton: MuiButton(theme),
    MuiListItemButton: MuiListItemButton(theme),
    MuiPaper: MuiPaper(theme),
    MuiTooltip: MuiTooltip(theme),
    MuiCard: MuiCard(theme),
    MuiCssBaseline: MuiCssBaseline(theme),
    MuiOutlinedInput: MuiOutlinedInput(theme),
  });
};

export default MuiOverides;
