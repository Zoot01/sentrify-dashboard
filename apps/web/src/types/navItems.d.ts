import { ChipProps } from "@mui/material"
import MUIcon from "@mui/icons-material"

export interface NavItemType {
  id: string
  title: string
  type: "group" | "item" | "collapse"
  icon?: keyof typeof MUIcon
  url?: string
  breadcrumbs?: boolean
  external?: boolean
  target?: boolean
  chip?: {
    color?: ChipProps["color"]
    variant?: ChipProps["variant"]
    size?: ChipProps["size"]
    label?: string
    avatar?: ReactElement
  }
  caption?: string
  disabled?: boolean
  children?: NavItemType[]
}
