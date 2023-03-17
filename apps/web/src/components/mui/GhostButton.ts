import { styled } from "@mui/material"
import Button from "@mui/material/Button"

// Styled
const GhostButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "1rem",
  padding: "4px 24px",
  color: theme.palette.text.primary,
  justifyContent: "center",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)",
  },
}))

export default GhostButton
