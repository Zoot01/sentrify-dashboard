import Loadable from "components/shared/Loadable"
import DashboardLayout from "layout/DashboardLayout/index"
import { lazy } from "react"
import { RouteObject } from "react-router-dom"
import AuthGuard from "./guards/AuthGuard"
const DashboardDefault = Loadable(lazy(() => import("views/dashboard/DashboardDefault/index")))
const CreateApplicant = Loadable(lazy(() => import("views/dashboard/CreateApplicant/index")))
const SearchApplicant = Loadable(lazy(() => import("views/dashboard/SearchApplicant/index")))
const SearchFiles = Loadable(lazy(() => import("views/dashboard/files/SearchFiles/index")))
const UploadFiles = Loadable(lazy(() => import("views/dashboard/files/UploadFiles/index")))
const Logs = Loadable(lazy(() => import("views/dashboard/utilities/Logs/index")))
const Status = Loadable(lazy(() => import("views/dashboard/utilities/Status/index")))
const BlankLayout = Loadable(lazy(() => import("views/dashboard/utilities/BlankLayout/index")))

const AuthRoutes = (): RouteObject => {
  return {
    path: "/",

    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <DashboardDefault />,
      },
      {
        path: "applicants",
        children: [
          {
            path: "create-applicant",
            element: <CreateApplicant />,
          },
          {
            path: "search-applicant",
            element: <SearchApplicant />,
          },
        ],
      },
      {
        path: "files",
        children: [
          {
            path: "upload-files",
            element: <UploadFiles />,
          },
          {
            path: "search-files",
            element: <SearchFiles />,
          },
        ],
      },
      {
        path: "utilities",
        children: [
          {
            path: "logs",
            element: <Logs />,
          },
          {
            path: "status",
            element: <Status />,
          },
          {
            path: "blank-layout",
            element: <BlankLayout />,
          },
        ],
      },
    ],
  }
}

export default AuthRoutes
