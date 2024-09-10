import { FC, useState } from 'react'
import { cn } from '@ui/utils/cn'
import { Drawer, DrawerHeader } from '@ui/components/base/Drawer'
import { Video } from '@ui/components/base/Video'
import { NavbarProgress } from '@ui/components/base/NavbarProgress'
import { Button } from '@ui/components/base/Button'
import { Markdown } from '@ui/components/base/Markdown'
import { videos } from '@/features/videos/content'

export interface VideoDrawerProps {
  title: string
  videoId: keyof typeof videos | null
  open: boolean
  onOpenChange: (value: boolean) => void
  onComplete: (() => void) | null
}

export const VideoDrawer: FC<VideoDrawerProps> = ({
  title,
  open,
  onOpenChange,
  onComplete,
  videoId,
}) => {
  const video = videoId && videos[videoId] ? videos[videoId] : null
  const [watched, setWatched] = useState(false)
  const [transcriptView, setTranscriptView] = useState(false)

  const closeDrawer = () => {
    if (watched && onComplete) {
      onComplete()
    }

    onOpenChange(false)
    setWatched(false)
  }

  const handleContinue = () => {
    if (onComplete) {
      onComplete()
    }

    setTranscriptView(false)
    onOpenChange(false)
    setWatched(false)
  }

  const handleTranscriptToggle = () => {
    setTranscriptView(!transcriptView)
  }

  const handleBackClicked = () => {
    if (transcriptView) {
      setTranscriptView(false)
      return
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      variant={transcriptView ? 'primary' : 'secondary'}
      preventDefaults
    >
      {video ? (
        <div className="text-purple-60">
          <DrawerHeader transparent={!transcriptView}>
            <NavbarProgress
              title={title}
              showBackBtn={transcriptView}
              showCloseBtn={!transcriptView}
              onBackClicked={handleBackClicked}
              onCloseClicked={closeDrawer}
              variant={transcriptView ? 'primary' : 'secondary'}
              className="mb-6"
            />
          </DrawerHeader>

          {transcriptView ? (
            <Markdown text={video.transcript} className="mt-20 pb-32 " purple />
          ) : (
            <div className="mt-14 flex ">
              <Video
                id={video.id}
                playbackId={video.playbackId}
                title={video.title}
                onEnded={() => setWatched(true)}
                className="mx-auto max-w-[60%] md:max-w-[50%]"
              />
            </div>
          )}
        </div>
      ) : null}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 flex flex-col items-center justify-center gap-4 pb-8',
          { 'bg-gradient-to-t from-neutral from-50%': transcriptView },
        )}
      >
        <Button onClick={handleContinue} variant="primary">
          Continue
        </Button>

        {!watched && (
          <Button
            onClick={handleTranscriptToggle}
            variant={!transcriptView ? 'link' : 'primary'}
            icon={!transcriptView ? 'next' : undefined}
          >
            {!transcriptView ? 'Read transcript' : 'Back to video'}
          </Button>
        )}
      </div>
    </Drawer>
  )
}
