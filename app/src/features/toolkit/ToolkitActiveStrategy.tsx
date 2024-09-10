import { FC, useState, useEffect } from 'react'
import { DrawerFooter, DrawerHeader } from '@ui/components/base/Drawer'
import { NavbarProgress } from '@ui/components/base/NavbarProgress'
import Image from 'next/image'
import { Button } from '@ui/components/base/Button'
import { ButtonShare } from '@ui/components/base/ButtonShare'
import { Strategy } from '@/features/strategies/types'
import { Video } from '@ui/components/base/Video'
import { cn } from '@ui/utils/cn'
import { videos } from '@/features/videos/content'
import { Markdown } from '@ui/components/base/Markdown'

function isDesktop() {
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
}

export interface ToolkitActiveStrategy {
  strategy: Strategy
  onBackClicked: () => void
  onCloseClicked: () => void
}

export const ToolkitActiveStrategy: FC<ToolkitActiveStrategy> = ({
  strategy,
  onBackClicked,
  onCloseClicked,
}) => {
  const [transcriptView, setTranscriptView] = useState(false)

  const toggleTranscriptView = () => {
    setTranscriptView(!transcriptView)
  }

  useEffect(() => {
    const drawerEl = document.querySelector('[vaul-drawer]')

    // Reset the scroll position
    if (drawerEl) {
      drawerEl.children[0].scrollTop = 0
    }
  }, [])

  if (strategy.image) {
    return (
      <>
        <DrawerHeader>
          <NavbarProgress
            title={strategy.name}
            showBackBtn={true}
            showCloseBtn={true}
            onBackClicked={onBackClicked}
            onCloseClicked={onCloseClicked}
          />
        </DrawerHeader>

        <Image
          src={strategy.image}
          alt={strategy.name}
          className="mb-24 mt-[90px] w-full"
        />
        <DrawerFooter>
          <Button variant="secondary" icon="download">
            <a
              href={strategy.image?.src}
              download
              className="before:absolute before:inset-0"
            >
              Save
            </a>
          </Button>
          {isDesktop() ? (
            <Button
              variant="secondary"
              icon="copy"
              onClick={() =>
                navigator.clipboard.writeText(
                  window.location.origin + strategy.image?.src,
                )
              }
            >
              Copy Link
            </Button>
          ) : (
            <ButtonShare
              label="Share"
              title={strategy.name}
              url={window.location.origin + strategy.image?.src}
              variant="secondary"
            />
          )}
        </DrawerFooter>
      </>
    )
  }

  if (strategy.type === 'video') {
    const video = videos[strategy.videoId || '']

    if (!video) {
      throw new Error(`Strategy with videoId ${strategy.videoId} not found`)
    }

    return (
      <>
        <div className="text-purple-60">
          <DrawerHeader>
            <NavbarProgress
              title={strategy.name}
              showBackBtn
              showCloseBtn
              onBackClicked={
                transcriptView ? toggleTranscriptView : onBackClicked
              }
              onCloseClicked={onCloseClicked}
            />
          </DrawerHeader>
          <div className="py-20">
            {transcriptView ? (
              <Markdown purple text={video.transcript} className="pb-32" />
            ) : (
              <div className="flex">
                <Video
                  id={video.id}
                  playbackId={video.playbackId}
                  title={video.title}
                  className="mx-auto max-w-[60%] md:max-w-[50%]"
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 mt-5 flex justify-center gap-2 pb-8 pt-12',
            { 'bg-gradient-to-t from-neutral from-50%': transcriptView },
          )}
        >
          <Button onClick={toggleTranscriptView} variant="primary">
            {!transcriptView ? 'Read transcript' : null}
            {transcriptView ? 'Back to video' : null}
          </Button>
        </div>
      </>
    )
  }

  return null
}
