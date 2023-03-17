import Avatar from "@mui/material/Avatar"
import ButtonBase from "@mui/material/ButtonBase"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import { styled, useTheme } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import { bindTrigger, PopupState } from "material-ui-popup-state/hooks"
import { useDispatch, useSelector } from "react-redux"
import { toggleFullscreenMode, toggleSidebar, toggleTheme } from "store/settings/settingsReducer"
import { AppDispatch, RootState } from "store/store"
import Icon from "ui/components/Icon"

interface ToggleSidebarButtonProps extends IconButtonProps {
  open: boolean
}

const ToggleSidebarButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<ToggleSidebarButtonProps>(({ theme, open }) => ({
  ...(open && {
    "& svg": {
      transition: "transform 350ms ease",
      transform: "rotate(0deg)",
    },
  }),
  ...(!open && {
    "& svg": {
      transition: "transform 350ms ease",
      transform: "rotate(180deg)",
    },
  }),
}))

interface Props {
  popupState: PopupState
  openSearchModal: () => void
}

const AppbarContent = ({ popupState, openSearchModal }: Props) => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const { sidebarIsOpen, themeSettings } = useSelector((state: RootState) => state.settings)
  const { settings, auth } = useSelector((state: RootState) => state)

  return (
    <Toolbar
      sx={{
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" gap={2}>
        <ToggleSidebarButton open={sidebarIsOpen} onClick={() => dispatch(toggleSidebar())}>
          <Icon icon="KeyboardDoubleArrowLeftOutlined" />
        </ToggleSidebarButton>
        <Tooltip title="Search">
          <IconButton onClick={openSearchModal}>
            <Icon icon="SearchOutlined" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack direction="row" gap={2}>
        <Tooltip title={themeSettings.mode === "light" ? "Dark Mode" : "Light Mode"}>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {themeSettings.mode === "light" ? (
              <Icon icon="DarkModeOutlined" />
            ) : (
              <Icon icon="LightModeOutlined" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title={settings.isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
          <IconButton onClick={() => dispatch(toggleFullscreenMode(!settings.isFullscreen))}>
            <Icon icon={settings.isFullscreen ? "FullscreenExitOutlined" : "FullscreenOutlined"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton>
            <Icon icon="NotificationsNoneOutlined" />
          </IconButton>
        </Tooltip>
        <ButtonBase
          sx={{
            borderRadius: "50%",
            border: "2px",
            borderStyle: "solid",
            borderColor: theme.palette.mode === "dark" ? "#FFFFFF" : "rgba(0, 0, 0, 0.54)",
            width: "40px",
            height: "40px",
          }}
          {...bindTrigger(popupState)}
        >
          <Avatar
            sx={{
              width: "28px",
              height: "28px",
            }}
            src={auth.user?.profile_img ?? "./images/avatars/avatar_6.png"}
          />
        </ButtonBase>
      </Stack>
    </Toolbar>
  )
}

export default AppbarContent
