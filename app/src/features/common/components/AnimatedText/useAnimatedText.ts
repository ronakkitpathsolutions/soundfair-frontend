import { useEffect, useState } from 'react'

export const useAnimatedText = (text: string) => {
  const [showAnimation, setShowAnimation] = useState(true)
  const [animationFinished, setAnimationFinished] = useState(false)

  useEffect(() => {
    setShowAnimation(false)
    setAnimationFinished(false)

    // Trigger animation
    setTimeout(() => {
      setShowAnimation(true)
    }, 0)

    // Wait until text is rendered to show highlight text
    const timeoutId = setTimeout(() => {
      setAnimationFinished(true)
    }, 30 * text.length - 350)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [text])

  return {
    showAnimation,
    setShowAnimation,
    animationFinished,
  }
}
