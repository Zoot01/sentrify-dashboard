import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Icon from "ui/components/Icon"

const BlankLayout = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        borderColor: theme.palette.divider,
        borderWidth: "1px",
        borderStyle: "dashed",
        height: "calc(100vh - 128px)",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: "50px",
        gap: 1,
      }}
    >
      <Icon icon="PublicOutlined" style={{ height: "100px", width: "100px" }} />
      <Typography variant="h6">A Blank Layout</Typography>
      <Typography variant="caption" textAlign="center">
        Keep in mind when using this layout to create pages you will want to use a grid component
        and remove the height property. This will be handled automatically using a flex grid. Please
        reference the &quot;Dashboard&quot; component for a proper example.
      </Typography>
    </Box>
  )
}

export default BlankLayout
