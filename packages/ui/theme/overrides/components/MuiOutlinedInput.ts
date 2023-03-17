import { alpha, Components, Theme } from "@mui/material";
import "@mui/material/Button";

const MuiOutlinedInput = (theme: Theme): Components["MuiOutlinedInput"] => {
  return {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.common.white, 0.05)
              : alpha(theme.palette.common.black, 0.05),
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor:
              theme.palette.mode === "light"
                ? alpha(theme.palette.common.black, 0.23)
                : alpha(theme.palette.common.white, 0.23),
          },
        },
        "&.Mui-error": {
          "& .MuiOutlinedInput-notchedOutline": {
            transition:
              "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            boxShadow: `${theme.palette.error.main} 0px 0px 0px 1px;`,
            borderColor: theme.palette.error.main,
          },
        },
        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            transition:
              "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            boxShadow: `${theme.palette.primary.main} 0px 0px 0px 1px;`,
            borderColor: theme.palette.primary.main,
          },
          "&:hover": {
            backgroundColor: "inherit",
          },
        },
        "& .MuiOutlinedInput-input": {
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            caretColor:
              theme.palette.mode === "light"
                ? theme.palette.common.black
                : theme.palette.common.white,
            borderRadius: "inherit",
            WebkitBackgroundClip: "text",
          },
        },
      },
    },
  };
};

export default MuiOutlinedInput;
