import { useTheme } from "@mui/material"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Fade from "@mui/material/Fade"

interface Props {
  loading: boolean
}

const LoadingOverlay = ({ loading }: Props) => {
  // Hooks
  const theme = useTheme()
  return (
    <Fade in={loading} unmountOnExit>
      <Backdrop
        open={loading}
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CircularProgress size={60} thickness={3.5} color="inherit" />
      </Backdrop>
    </Fade>
  )
}

export default LoadingOverlay
