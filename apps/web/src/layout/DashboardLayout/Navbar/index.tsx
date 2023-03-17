import { Typography } from "@mui/material"
import navigation from "config/navigation"
import NavGroup from "./NavList/NavGroup"

const Navbar = () => {
  const NavItems = navigation.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />
      default:
        return (
          <Typography key={item.id} variant="body1" color="error" align="center">
            Error
          </Typography>
        )
    }
  })

  return <>{NavItems}</>
}

export default Navbar
