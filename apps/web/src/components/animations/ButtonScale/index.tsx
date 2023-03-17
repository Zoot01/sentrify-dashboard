import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const ButtonScale = ({ children }: Props) => {
  return (
    <motion.div
      className="box"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  )
}

export default ButtonScale
