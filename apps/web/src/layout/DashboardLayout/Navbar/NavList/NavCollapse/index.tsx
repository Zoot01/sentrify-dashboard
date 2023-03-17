import { ListItem } from "@mui/material"
import Box, { BoxProps } from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { styled, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { NavItemType } from "types/navItems"
import Icon from "ui/components/Icon"
import NavItem from "../NavItem"

interface DropdownArrowProps extends BoxProps {
  open: boolean
}

const ToggleCollapseButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<DropdownArrowProps>(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...(open && {
    "& svg": {
      transition: "transform 350ms ease",
      transform: "rotate(90deg)",
    },
  }),
  ...(!open && {
    "& svg": {
      transition: "transform 350ms ease",
      transform: "rotate(0deg)",
    },
  }),
}))

interface Props {
  menu: NavItemType
  level: number
}

const NavCollapse = ({ menu, level }: Props) => {
  // Hooks
  const theme = useTheme()
  const { pathname } = useLocation()
  // State
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const handleClick = () => {
    setOpen(!open)
    setSelected(!selected ? menu.id : null)
  }

  const checkOpenForParent = (child: NavItemType[], id: string) => {
    child.forEach((item) => {
      if (item.url === pathname) {
        setOpen(true)
        setSelected(id)
      }
    })
  }

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false)
    setSelected(null)
    if (menu.children) {
      menu.children.forEach((item) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id)
        }
        if (item.url === pathname) {
          setSelected(menu.id)
          setOpen(true)
        }
      })
    }
  }, [pathname, menu.children])

  const Menus = menu.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} menu={item} level={level + 1} />
      case "item":
        return <NavItem key={item.id} item={item} level={level + 1} />
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        )
    }
  })

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
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
          selected={selected === menu.id}
          onClick={handleClick}
        >
          <ListItemIcon
            sx={{
              my: "auto",
              minWidth: !menu.icon ? 18 : 36,

              color: selected === menu.id ? "#4F46E5" : "#9DA4AE",
            }}
          >
            {menu.icon ? (
              <Icon icon={menu.icon} />
            ) : (
              <Icon icon="FiberManualRecord" style={{ height: "14px", width: "14px" }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontWeight={selected === menu.id ? "600" : "500"}
                color="#9DA4AE"
                sx={{ my: "auto" }}
              >
                {menu.title}
              </Typography>
            }
            secondary={
              menu.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.caption }}
                  display="block"
                  gutterBottom
                  color="#9DA4AE"
                >
                  {menu.caption}
                </Typography>
              )
            }
          />
          <Box component={"div"} sx={{ display: "flex" }} className="dropdown-arrow">
            <ToggleCollapseButton open={open}>
              <Icon
                icon="KeyboardArrowRightOutlined"
                style={{
                  height: "16px",
                  width: "16px",
                  color: "#9DA4AE",
                }}
              />
            </ToggleCollapseButton>
          </Box>
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: "relative",
            p: 0,
          }}
        >
          {Menus}
        </List>
      </Collapse>
    </>
  )
}

export default NavCollapse
