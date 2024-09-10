import { FC, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface TransitionExpandProps {
  isVisible: boolean
  children: ReactNode
}
export const TransitionExpand: FC<TransitionExpandProps> = ({
  children,
  isVisible,
  ...props
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
