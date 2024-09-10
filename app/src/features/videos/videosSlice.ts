import { createSlice } from '@reduxjs/toolkit'
import { videos } from '@/features/videos/content'
interface VideoState {
  title: ''
  openVideo: keyof typeof videos | null
  onComplete: (() => void) | null
}

const initialState: VideoState = {
  title: '',
  openVideo: null,
  onComplete: null,
}

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    toggleVideo: (state, action) => {
      state.openVideo = action.payload

      if (!action.payload) {
        state.title = ''
        state.onComplete = null
        return
      }
    },
    setVideoTitle: (state, action) => {
      state.title = action.payload
    },
    setVideoOnComplete: (state, action) => {
      state.onComplete = action.payload
    },
  },
})

export const { toggleVideo, setVideoTitle, setVideoOnComplete } =
  videosSlice.actions

export const selectorOpenVideo = (state: { videos: VideoState }) =>
  state.videos.openVideo

export default videosSlice.reducer
