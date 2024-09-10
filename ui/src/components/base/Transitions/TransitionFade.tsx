import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const variants = {
  in: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
}

interface TransitionFadeProps {
  keyValue?: string
  children: ReactNode
}
export const TransitionFade = ({ keyValue, children }: TransitionFadeProps) => {
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
