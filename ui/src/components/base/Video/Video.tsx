import React, { FC } from 'react'
import MuxPlayer, { MuxPlayerProps } from '@mux/mux-player-react'
import '@mux/mux-player/themes/microvideo'
import { cn } from '../../../utils/cn'

export interface VideoProps extends MuxPlayerProps {
  playbackId: string
  id: string
  title: string
  className?: string
}

export const Video: FC<VideoProps> = ({
  playbackId,
  title,
  id,
  className,
  ...props
}) => {
  return (
    <MuxPlayer
      theme="microvideo"
      streamType="on-demand"
      playbackId={playbackId}
      metadata={{
        video_id: id,
        video_title: title,
      }}
      primaryColor="#DBD1F4"
      secondaryColor="#3B1C59"
      className={cn('aspect-[9/16] overflow-hidden rounded-lg', className)}
      {...props}
    />
  )
}
