'use client'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// Components
import { Head } from '@/features/common/components/Head'

// Steps
import withUser from '@/hoc/withUser'
import { Typography } from '@ui/components/base/Typography'
import { Button } from '@ui/components/base/Button'
import { Container } from '@ui/components/base/Grid'
import { selectorQuizCompleted } from '@/features/soundfair/userData'
import { useEffect, useState } from 'react'
import IntroImage from '../assets/images/Hearing-Wellbeing-Intro.jpeg'
import Image from 'next/image'
import { LayoutDefault } from '@/features/common/layouts/LayoutDefault'
import { getReportByUser } from '@/features/soundfair/quizResult'

export function Home() {
  const router = useRouter()
  const { user } = useSelector((state) => state?.auth)
  const { finalReport } = useSelector((state) => state?.quizResult)
  const dispatch = useDispatch()
  const quizCompleted = useSelector(selectorQuizCompleted)

  // Added to Stop redirect being called many times while it's pre-loading

  const handleBuildClick = () => {
    router.push({
      pathname: '/build',
    })
  }

  useEffect(() => {
    if (user?.role_id === 2) {
      dispatch(getReportByUser({ params: { user_id: user?.id } })).then(
        (res) => {
          if (res.payload)
            return router.push({
              pathname: '/dashboard',
            })
        },
      )
    } else {
      router.push({
        pathname: '/categories',
      })
    }
  }, [user, dispatch, router])

  return (
    <>
      <Head title="Home" />
      {user && !Object.entries(finalReport).length && (
        <LayoutDefault>
          <div className="min-h-screen">
            <Container className="py-5">
              <Typography variant={'h1-sm'}>
                Navigating the social and emotional challenges of living with
                hearing loss
              </Typography>
              <Image
                alt="Hearing Wellbeing Program - People Clapping"
                className="mt-5"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                }}
                src={IntroImage}
              />
              <Typography className="mt-5" variant={'text-md'}>
                Welcome to the Hearing Wellbeing Service program—a tailored,
                self-guided program designed by psychologists and audiologists
                that supports people to better understand and cope with
                challenges they may face due to hearing conditions or hearing
                loss. Is hearing loss impacting your wellbeing? Is communication
                making you frustrated, isolated, or embarrassed? You're not
                alone. The Hearing Wellbeing Program (HWP) is a personalised,
                self-guided program designed by psychologists, audiologists, and
                people just like you. This free program will help support you to
                understand and cope with the challenges of living with hearing
                loss.
              </Typography>
              {/* <Button variant={'link'}>Preview the program</Button> */}
            </Container>
            <Container className="bg-white py-5">
              <Typography variant={'h1-sm'}>How it works</Typography>
              <div className="number-point">
                <span>1</span>Step 1
              </div>
              <Typography variant={'text-md'}>
                Answer some questions to build your profile and understand where
                hearing loss is impacting your life
              </Typography>
              <div className="number-point">
                <span>2</span>Step 2
              </div>
              <Typography variant={'text-md'}>
                Based on your profile we'll recommend a personalised plan to
                support your wellbeing
              </Typography>
              <div className="number-point">
                <span>3</span>Step 3
              </div>
              <Typography variant={'text-md'}>
                Unlock practical strategies and track your progress as you
                advance through the program
              </Typography>
              <div className="mt-10 flex flex-col">
                <Button onClick={handleBuildClick} variant={'primary'}>
                  Build your program
                </Button>
              </div>
            </Container>
          </div>
        </LayoutDefault>
      )}
    </>
  )
}

export default withUser(Home)
