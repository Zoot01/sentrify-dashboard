import { forwardRef } from "react"
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom"

const ReactRouterLink = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

ReactRouterLink.displayName = "RouterLink"

export default ReactRouterLink
