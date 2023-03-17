import { useRoutes } from "react-router-dom"
import AuthRoutes from "./AuthRoutes"
import PublicRoutes from "./PublicRoutes"

export default function Routes() {
  return useRoutes([AuthRoutes(), PublicRoutes()])
}
