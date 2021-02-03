import { createSlice } from '@reduxjs/toolkit'
import { updateList } from './helpers'

const initialState = {
  loading: null,
  error: null,
  success: false,
  taskList: [],
}

const {
  actions: { requestStart, requestSuccess, requestFailure },
  reducer,
} = createSlice({
  name: 'list',
  initialState,
  reducers: {
    requestStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    requestSuccess: (state, action) => (
      updateList(state, action)
    ),
    requestFailure: (state) => ({
      ...state,
      error: true,
    }),
  },
})

export default reducer
export { requestStart, requestSuccess, requestFailure }
