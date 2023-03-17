import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import { NavItemType } from "types/navItems"
import NavCollapse from "../NavCollapse"
import NavItem from "../NavItem"

interface Props {
  item: NavItemType
}

const NavGroup = ({ item }: Props) => {
  // Return nav item or nav collapseable item group
  const Items = item.children?.map((menu) => {
    switch (menu.type) {
      case "collapse":
        return <NavCollapse key={menu.id} menu={menu} level={1} />
      case "item":
        return <NavItem key={menu.id} item={menu} level={1} />
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        )
    }
  })

  return (
    <>
      <List
        sx={{ p: 0, mt: 0.25, mb: 1.25 }}
        subheader={
          item.title && (
            <Typography variant="body1" fontSize={14} display="block" gutterBottom color="#FFF">
              {item.title}
              {item.caption && (
                <Typography variant="caption" display="block" gutterBottom color="#9DA4AE">
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {Items}
      </List>
    </>
  )
}

export default NavGroup
