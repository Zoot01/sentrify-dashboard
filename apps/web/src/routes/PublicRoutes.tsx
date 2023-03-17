import DefaultLayout from "layout/DefaultLayout"
import { RouteObject } from "react-router-dom"
import ForgotPassword from "views/auth/ForgotPassword"
import Login from "views/auth/Login"
import Register from "views/auth/Register"
import ResetPassword from "views/auth/ResetPassword"
import Verify from "views/auth/Verify"

const PublicRoutes = (): RouteObject => {
  return {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/verify/:user_id",
        element: <Verify />,
      },
      {
        path: "/auth/resetpassword",
        element: <ResetPassword />,
      },
    ],
  }
}

export default PublicRoutes
