import Box, { BoxProps } from "@mui/material/Box"
import { styled } from "@mui/material/styles"

const ReactHotToastWrapper = styled(Box)<BoxProps>(({ theme }) => {
  return {
    "& > div": {
      left: `${theme.spacing(6)} !important`,
      right: `${theme.spacing(6)} !important`,
      bottom: `${theme.spacing(6)} !important`,
      zIndex: `${theme.zIndex.drawer - 1} !important`,
    },
    "& .react-hot-toast": {
      color: "#FFFFFF",
      fontWeight: 400,
      borderRadius: 8,
      fontSize: "1rem",
      letterSpacing: "0.14px",
      background: "#212c41e6",
      boxShadow: theme.shadows[15],
      "&>:first-of-type:not([role])>:first-of-type": {
        width: 14,
        height: 14,
      },
    },
  }
})

export default ReactHotToastWrapper
