import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { bindPopover, PopupState } from "material-ui-popup-state/hooks"
import { MouseEvent, useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutThunk } from "store/auth/authReducer"
import { AppDispatch, RootState } from "store/store"
import Icon from "ui/components/Icon"

interface Props {
  popupState: PopupState
}

const LogoutButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "1rem",
  padding: "4px 24px",
  color: theme.palette.text.primary,
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)",
  },
}))

const ProfileDropdown = ({ popupState }: Props) => {
  // Hooks
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const { user } = useSelector((state: RootState) => state.auth)

  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutThunk()).unwrap()
      if (res) {
        navigate("/", { replace: true })
        toast.success(res.message)
      }
    } catch (err) {
      const message = err as string
      toast.error(message)
    }
  }

  const handleListItemClick = (event: MouseEvent<HTMLDivElement>, index: number, route: string) => {
    setSelectedIndex(index)
    popupState.close()

    if (route && route !== "") {
      navigate(route)
    }
  }

  return (
    <Popover
      {...bindPopover(popupState)}
      anchorOrigin={{
        vertical: 44,
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          py: "8px",
        }}
      >
        <Stack sx={{ px: "12px" }}>
          <Typography fontWeight={600}>{user?.first_name + " " + user?.last_name}</Typography>
          <Typography variant="caption" color="text.secondary" textTransform="capitalize">
            {user?.role}
          </Typography>
        </Stack>
        <Divider sx={{ my: "8px" }} />
        <Stack sx={{ px: "12px" }}>
          <List disablePadding>
            <ListItem
              disablePadding
              sx={{
                minWidth: "170px",
              }}
            >
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0, "/")}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "flex-center",
                  borderRadius: "8px",
                  mb: 0.5,
                  py: "2px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "0px",
                    mr: 1,
                  }}
                >
                  <Icon icon="AccountBoxOutlined" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontWeight={500} variant="body1">
                      Profile
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                minWidth: "170px",
              }}
            >
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1, "/")}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "flex-center",
                  borderRadius: "8px",
                  mb: 0.5,
                  py: "2px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "0px",
                    mr: 1,
                  }}
                >
                  <Icon icon="TuneOutlined" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontWeight={500} variant="body1">
                      Settings
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                minWidth: "170px",
              }}
            >
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2, "/")}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "flex-center",
                  borderRadius: "8px",
                  py: "2px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "0px",
                    mr: 1,
                  }}
                >
                  <Icon icon="BookmarksOutlined" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontWeight={500} variant="body1">
                      Bookmarks
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
        <Divider sx={{ my: "8px" }} />
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ px: "12px" }}>
          <LogoutButton
            fullWidth
            startIcon={<Icon icon="LogoutOutlined" />}
            onClick={() => handleLogout()}
          >
            Logout
          </LogoutButton>
        </Stack>
      </Stack>
    </Popover>
  )
}

export default ProfileDropdown
