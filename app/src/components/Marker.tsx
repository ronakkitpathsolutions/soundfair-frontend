import markerSDK from '@marker.io/browser'
import { useEffect, FC } from 'react'

export const Marker: FC<{ projectId: string }> = ({ projectId }) => {
  useEffect(() => {
    markerSDK.loadWidget({
      project: projectId,
    })
  }, [])

  return null
}
