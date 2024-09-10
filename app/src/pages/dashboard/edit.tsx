import { api } from '@/api/client'
import { getModuleByUser, selectModuleList } from '@/features/soundfair/modules'
import { selectorUnlockedModules } from '@/features/soundfair/userData'
import { updateToast } from '@/features/toast'
import { Button } from '@ui/components/base/Button'
import { Container } from '@ui/components/base/Grid'
import { Link } from '@ui/components/base/Link'
import ModuleCard from '@ui/components/base/ModuleCard'
import { Typography } from '@ui/components/base/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
interface Module {
  module_id: number
  name: string
  category: string
  score?: number
}

interface ModulesState {
  userModules: Module[]
  moduleData: Module[]
}

interface AuthState {
  user: {
    id: number
    name: string
    email: string
  }
  // Add other properties related to auth here
}

interface RootState {
  modules: ModulesState
  auth: AuthState
  [key: string]: any // This allows dynamic keys
}

export default function Edit() {
  const dispatch = useDispatch()
  const modules = useSelector(selectModuleList)
  const { moduleData } = useSelector((state: RootState) => state?.modules)
  const { user } = useSelector((state: RootState) => state?.auth)
  const { userModules } = useSelector((state: RootState) => state?.modules)
  // const isAvailableInUserModule = useMemo(() => {
  //   userModules.some((item) => item.module_id === module?.module_id)
  // }, [userModules])
  const unlockedModules = useSelector(selectorUnlockedModules)
  const handleActionClick = async (moduleId: string) => {
    try {
      if (userModules.some((item) => item?.module_id === moduleId)) {
        await api.modules
          .removeUserModule({
            id: moduleId,
            user_id: user?.id,
          })
          .then((response) => {
            dispatch(getModuleByUser({ params: { user_id: user.id } }))

            if (response?.data) {
              dispatch(
                updateToast({
                  open: true,
                  message: response?.data?.message || '',
                  variant: 'success',
                }),
              )
            }
          })

        // let lessons: string[] = []
        // const first = modules.find((m) => m.id === moduleId)?.lessons[0]
        // if (first) {
        //   lessons = [first]
        // }
        // dispatch(unlockLessons(lessons))
      } else {
        await api.modules
          .addUserModule({
            user_id: user?.id,
            module_id: moduleId,
          })
          .then((response) => {
            dispatch(getModuleByUser({ params: { user_id: user.id } }))
            if (response?.data) {
              dispatch(
                updateToast({
                  open: true,
                  message: response?.data?.message || '',
                  variant: 'success',
                }),
              )
            }
          })

        // let lessons: string[] = []
        // const first = modules.find((m) => m.id === moduleId)?.lessons[0]
        // if (first) {
        //   lessons = [first]
        // }
        // dispatch(unlockLessons(lessons))
      }
    } catch (error) {
      console.log('error', error)
      if (error) {
        dispatch(
          updateToast({
            open: true,
            message: error?.message || '',
            variant: 'error',
          }),
        )
      }
    }
  }

  return (
    <>
      <Container className="mb-20 mt-5 flex min-h-screen flex-col gap-5">
        <Link href="/dashboard">
          <Button variant={'link'} icon="back">
            Back
          </Button>
        </Link>
        <Typography variant={'heading-l'} className="mb-10">
          Edit your program
        </Typography>
        {moduleData?.length > 0 &&
          moduleData.map((module) => {
            return (
              <ModuleCard
                moduleId={module?.module_id}
                onClick={() => handleActionClick(module.module_id)}
                title={module?.name}
                key={module?.module_id}
                status={
                  userModules.some(
                    (item) => item.module_id === module?.module_id,
                  )
                    ? 'remove'
                    : 'add'
                }
              />
            )
          })}
      </Container>
    </>
  )
}
