import { all } from 'redux-saga/effects'
import listWatcher from './getList'

export default function* rootSaga() {
  yield all([
    listWatcher()
  ])
}
