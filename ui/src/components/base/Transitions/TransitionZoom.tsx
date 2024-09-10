import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const variants = {
  in: {
    opacity: 1,
    transform: 'scale(1)',
    transition: {
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    transform: 'scale(0.95)',
    transition: {
      duration: 0.3,
    },
  },
}

interface TransitionZoomProps {
  keyValue?: string
  children: ReactNode
}
export const TransitionZoom = ({ keyValue, children }: TransitionZoomProps) => {
  const { asPath } = useRouter()

  return (
    <div className="effect-1">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={keyValue ? keyValue : asPath}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
