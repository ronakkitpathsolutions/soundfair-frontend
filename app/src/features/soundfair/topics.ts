import { createSlice } from '@reduxjs/toolkit'
import { TopicArea } from './types'
import AirtableData from '../../../../data.airtable.json'

interface TopicAreasState {
  topicAreas: {
    [id: string]: TopicArea
  }
}

const initialState = {
  topicAreas: AirtableData.topics,
}

export const topicAreasSlice = createSlice({
  name: 'topicAreas',
  initialState,
  reducers: {
    setTopicAreas: (state, action) => {
      state.topicAreas = action.payload
    },
  },
})

export const { setTopicAreas } = topicAreasSlice.actions

export const selectorTopicAreas = (state: { topicAreas: TopicAreasState }) =>
  state.topicAreas.topicAreas

export const selectorTopicArea =
  (id?: string) => (state: { topicAreas: TopicAreasState }) => {
    if (!id) return undefined
    return state.topicAreas.topicAreas[id]
  }

const topicAreaReducer = topicAreasSlice.reducer
export default topicAreaReducer
