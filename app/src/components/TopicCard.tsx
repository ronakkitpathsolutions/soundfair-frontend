import { Typography } from '@ui/components/base/Typography'
import { cn } from '@ui/utils/cn'
import cx from 'clsx'

export const TopicCard = ({
  title,
  description,
  colour = 'green',
  border = true,
}: {
  title: string
  description?: string
  colour?: 'red' | 'green' | 'yellow'
  border?: boolean
}) => {
  return (
    <div
      className={cn(
        'mt-5 flex flex-col gap-2 border-neutral-dark',
        border ? 'border-b' : '',
      )}
    >
      <Typography variant={'h3'} className="inline-flex items-center">
        <div
          className={cx('marker mr-2 h-4 w-4 rounded-lg', {
            'bg-green': colour === 'green',
            'bg-yellow': colour === 'yellow',
            'bg-red': colour === 'red',
          })}
        />
        {title}
      </Typography>
      <Typography className="text-neutral-dark" variant={'text-sm'}>
        {description}
      </Typography>
    </div>
  )
}

export default TopicCard
