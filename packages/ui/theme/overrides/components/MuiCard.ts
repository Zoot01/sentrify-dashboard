import { Components, Theme } from "@mui/material";
import "@mui/material/Button";

const MuiCard = (theme: Theme): Components["MuiCard"] => {
  return {
    styleOverrides: {
      root: {
        borderWidth: theme.palette.mode === "light" ? "1px" : 0,
        borderStyle: theme.palette.mode === "light" ? "solid" : "none",
        borderColor:
          theme.palette.mode === "light" ? theme.palette.divider : "",
        borderRadius: "16px",
        boxShadow: "none",
        "& .MuiTableContainer-root, & .MuiDataGrid-root, & .MuiDataGrid-columnHeaders":
          {
            borderRadius: 0,
          },
      },
    },
    defaultProps: {
      elevation: 0,
    },
  };
};

export default MuiCard;
