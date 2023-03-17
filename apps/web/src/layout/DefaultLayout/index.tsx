import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import Logo from "components/Logo"
import ReactRouterLink from "components/shared/ReactRouterLink"
import { Outlet } from "react-router-dom"
import Icon from "ui/components/Icon"

const DefaultLayout = () => {
  // Hooks
  const theme = useTheme()
  return (
    <Box
      sx={{
        height: "calc(100vh - 150px)",
      }}
    >
      <Box
        sx={{
          px: 4,
          py: 3,
          maxHeight: "94px",
          height: "94px",
        }}
      >
        <ReactRouterLink href={"/auth/login"}>
          <Logo textColor={theme.palette.mode === "light" ? "#1C2536" : undefined} />
        </ReactRouterLink>
      </Box>
      <Outlet />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 1,
          height: "56px",
          maxHeight: "56px",
        }}
      >
        <Typography>
          {`© ${new Date().getFullYear()} `}
          Sentrify
        </Typography>
        <IconButton href="https://github.com/Zoot01" LinkComponent={Link} target="_blank">
          <Icon icon="GitHub" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default DefaultLayout
