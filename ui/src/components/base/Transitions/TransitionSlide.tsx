import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const variants = {
  // I want it to slide in from off screen and then exit on the opposite side
  enter: {
    x: '100%',
    opacity: 0,
  },
  in: {
    x: '0',
    opacity: 1,
  },
  out: {
    x: '-100%',
    opacity: 0,
  },
}

interface TransitionSlideProps {
  keyValue?: string
  children: ReactNode
  reverse?: boolean
}
export const TransitionSlide = ({
  keyValue,
  children,
  reverse,
}: TransitionSlideProps) => {
  const { asPath } = useRouter()

  const transition = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  }

  return (
    <div className="effect-1">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={keyValue ? keyValue : asPath}
          variants={variants}
          transition={transition}
          animate={'in'}
          initial={reverse ? 'out' : 'enter'}
          exit={reverse ? 'enter' : 'out'}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
