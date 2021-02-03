import { combineReducers } from '@reduxjs/toolkit'
import listReducer from './list'

const rootReducer = combineReducers({
  listReducer,
})

export default rootReducer
