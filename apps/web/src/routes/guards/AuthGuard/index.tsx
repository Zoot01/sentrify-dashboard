import LoadingOverlay from "components/shared/LoadingOverlay"
import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { restoreSessionThunk } from "store/auth/authReducer"
import { AppDispatch, RootState } from "store/store"

interface Props {
  children: ReactNode
}

const AuthGuard = ({ children }: Props) => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(restoreSessionThunk())
  }, [])

  if (loading) {
    return <LoadingOverlay loading={loading} />
  }

  if (user) {
    return <>{children}</>
  }

  if (!user && !loading) {
    return <Navigate to={"/auth/login"} replace />
  } else return <Navigate to={"/auth/login"} replace />
}

export default AuthGuard
