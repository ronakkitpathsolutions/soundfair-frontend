import { FC } from 'react'
import { Drawer } from '@ui/components/base/Drawer'
import { NavbarProgress } from '@ui/components/base/NavbarProgress'
import { Button } from '@ui/components/base/Button'
import { useSelector } from 'react-redux'
import { selectCurrentTooltip } from '../soundfair/modules'
import { Container } from '@ui/components/base/Grid'
import { Typography } from '@ui/components/base/Typography'

export interface CrisisSupportDrawerProps {
  open: boolean
  onOpenChange: (value: boolean) => void
}

export const CrisisSupportDrawer: FC<CrisisSupportDrawerProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} variant="primary">
      <Container className="px-8 py-4">
        <div className="sticky top-0 flex-col bg-white pt-5">
          <Button
            icon="close"
            variant={'link'}
            className="[&_i]:px-1 [&_i]:py-1"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
        <Typography
          className="mt-4 flex flex-row justify-center"
          variant={'heading-l'}
        >
          Crisis Support
        </Typography>
        <div className="mt-8 text-center text-purple-60">
          <div className="mb-8">
            <p className="mb-2">
              You can chat to trained support specialists 24/7 at:
            </p>
            <p className="mb-2">1. Lifeline</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <a href="sms:0477131114">Text 0477 13 11 14</a>
              </Button>
              <Button asChild>
                <a
                  href="https://www.lifeline.org.au/crisis-chat"
                  target="_blank"
                >
                  Online chat
                </a>
              </Button>
              <Button asChild>
                <a href="tel:131114" target="_blank">
                  Call 13 11 14
                </a>
              </Button>
            </div>
          </div>
          <div className="mb-8">
            <p className="mb-2">2. Kids Helpline</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <a
                  href="https://www.kidshelpline.com.au/get-help/webchat-counselling"
                  target="_blank"
                >
                  Online chat
                </a>
              </Button>
              <Button asChild>
                <a href="tel:1800551800">1800 55 1800</a>
              </Button>
            </div>
          </div>
          <div className="mb-8">
            <p className="mb-2">3. Beyond Blue</p>
            <div className="flex flex-wrap flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <a
                  href="https://www.beyondblue.org.au/support-service/chat"
                  target="_blank"
                >
                  Online chat
                </a>
              </Button>
              <Button asChild>
                <a href="tel:1300224636">1300 224 636</a>
              </Button>
              <Button asChild>
                <a
                  href="https://www.beyondblue.org.au/support-service/email"
                  target="_blank"
                >
                  Email
                </a>
              </Button>
            </div>
          </div>
          <div className="mb-8">
            <p className="mb-2">4. Reachout</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <a href="https://au.reachout.com/peerchat" target="_blank">
                  Peer chat
                </a>
              </Button>
              <Button asChild>
                <a
                  href="https://forums.au.reachout.com/?sort=Top&filter=everything"
                  target="_blank"
                >
                  Community forum
                </a>
              </Button>
            </div>
          </div>
          <div className="mb-8">
            <p className="mb-2">5. Suicide call back servicee</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <a
                  href="https://www.suicidecallbackservice.org.au/phone-and-online-counselling"
                  target="_blank"
                >
                  Online chat
                </a>
              </Button>
              <Button asChild>
                <a href="tel:1800650890">1800 650 890</a>
              </Button>
            </div>
          </div>
          <div className="mb-8">
            <p className="mb-2">
              You can also connect with these specialist services:
            </p>
            <div className="mb-8">
              <p className="mb-2">
                1. 13YARN (Aboriginal or Torres Strait Islander crisis support)
              </p>
              <Button asChild>
                <a href="tel:139276">Call 13 9276</a>
              </Button>
            </div>
            <div className="mb-8">
              <p className="mb-2">2. Q Life (LGBTQI+ peer support)</p>
              <p className="mb-2">3pm to midnight</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild>
                  <a href="tel:1800184527">Call 1800 184 527</a>
                </Button>
                <Button asChild>
                  <a href="https://qlife.org.au/resources/chat" target="_blank">
                    Online chat
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Drawer>
  )
}
