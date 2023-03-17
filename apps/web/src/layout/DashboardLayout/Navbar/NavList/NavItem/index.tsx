import { ListItem } from "@mui/material"
import Chip from "@mui/material/Chip"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import ReactRouterLink from "components/shared/ReactRouterLink"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOpenMenuItems, setSidebar } from "store/settings/settingsReducer"
import { AppDispatch, RootState } from "store/store"
import { NavItemType } from "types/navItems"
import Icon from "ui/components/Icon"

interface Props {
  item: NavItemType
  level: number
}

const NavItem = ({ item, level }: Props) => {
  // Hooks
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"))
  const { openMenuItems } = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch<AppDispatch>()

  const ItemIcon = () => {
    return item.icon ? (
      <Icon icon={item.icon} />
    ) : (
      <Icon icon="FiberManualRecord" style={{ height: "14px", width: "14px" }} />
    )
  }

  const itemHandler = (id: string) => {
    dispatch(setOpenMenuItems(id))
    if (matchesSM) dispatch(setSidebar(false))
  }

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id)
    if (currentIndex > -1) {
      dispatch(setOpenMenuItems(item.id))
    }
  }, [])

  return (
    <ListItem disablePadding>
      <ListItemButton
        disabled={item.disabled}
        component={ReactRouterLink}
        href={item.url ?? "/"}
        target={item.target ? "_blank" : "_self"}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          alignContent: "flex-center",
          borderRadius: "8px",
          mb: 0.5,
          backgroundColor: level > 1 ? "transparent !important" : "inherit",
          py: "0px",
          pl: `${level * 12}px`,
          "&:hover": {
            background: "rgba(255, 255, 255, 0.04)",
          },
          "&.Mui-selected": {
            background: "rgba(255, 255, 255, 0.04)",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.05)",
            },
          },
        }}
        onClick={() => itemHandler(item.id)}
        selected={openMenuItems.findIndex((id) => id === item.id) > -1}
      >
        <ListItemIcon
          sx={{
            my: "auto",
            minWidth: !item?.icon ? 18 : 36,
            color: openMenuItems.findIndex((id) => id === item.id) > -1 ? "#4F46E5" : "#9DA4AE",
          }}
        >
          {ItemIcon()}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              fontWeight={openMenuItems.findIndex((id) => id === item.id) > -1 ? 600 : 500}
              variant="body1"
              color={openMenuItems.findIndex((id) => id === item.id) > -1 ? "#FFFFFF" : "#9DA4AE"}
            >
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography variant="caption" display="block" gutterBottom>
                {item.caption}
              </Typography>
            )
          }
        />
        {item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
          />
        )}
      </ListItemButton>
    </ListItem>
  )
}

export default NavItem
