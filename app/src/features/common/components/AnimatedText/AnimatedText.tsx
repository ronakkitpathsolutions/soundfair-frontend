import { CSSProperties, FC } from 'react'
import { cn } from '@ui/utils/cn'
import { TransitionExpand } from '@ui/components/base/Transitions'
import { Markup } from '@ui/components/base/Markup/Markup'

export interface AnimatedTextProps {
  text: string
  secondaryText?: string
  showAnimation: boolean
  animationFinished?: boolean
  className?: string
}

export const AnimatedText: FC<AnimatedTextProps> = ({
  text,
  secondaryText,
  showAnimation = false,
  animationFinished = false,
  className,
}) => {
  return (
    <div className={cn('mx-auto', className)}>
      <p className="whitespace-pre-wrap text-center text-base text-neutral md:text-lg">
        {showAnimation ? (
          <span
            className={cn({
              'transition-typewriter': showAnimation,
            })}
            style={{ '--n': text.length } as CSSProperties}
          >
            <Markup
              text={text}
              className={cn('text-neutral transition-opacity ease-in-out', {
                'opacity-0': !animationFinished,
              })}
            />
          </span>
        ) : null}
      </p>
      <TransitionExpand isVisible={animationFinished}>
        <p className="text-primary mt-4 text-center text-display-sm md:mt-8">
          {secondaryText}
        </p>
      </TransitionExpand>
    </div>
  )
}
