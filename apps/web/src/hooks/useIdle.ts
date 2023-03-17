import { useState } from "react"
import { useIdleTimer } from "react-idle-timer"
import { useDispatch } from "react-redux"
import { logoutThunk } from "store/auth/authReducer"
import { AppDispatch } from "store/store"

interface Props {
  onIdle: () => void
  idleTime: number
}

const useIdle = ({ onIdle, idleTime = 1 }: Props) => {
  const idleTimeout = 1000 * idleTime
  const [isIdle, setIdle] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const handleIdle = async () => {
    setIdle(true)
    await dispatch(logoutThunk())
  }
  const idleTimer = useIdleTimer({
    timeout: idleTimeout,
    promptBeforeIdle: idleTimeout / 2,
    onPrompt: onIdle,
    onIdle: handleIdle,
    debounce: 500,
  })
  return {
    isIdle,
    setIdle,
    idleTimer,
  }
}
export default useIdle
