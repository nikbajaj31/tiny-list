import { takeLatest, put } from 'redux-saga/effects'
import {
  requestStart,
  requestSuccess,
  requestFailure,
  updateList
} from '../redux/actions'
import ListServices from '../services/list'
import { CREATE, UPDATE, DELETE, UPDATETASK } from '../redux/constants'

function* listWatcher() {
  yield takeLatest(requestStart, listWorker)
}

function* listWorker(action) {
  try {
    const { payload = {} } = action
    const { method = 'fetchList' } = payload
    let responseData = {}
    switch (method) {
      case CREATE: {
        const { task } = payload
        responseData = yield ListServices.createTask(task)
        break
      }
      case UPDATE: {
        const { data } = payload
        const { action, task = {} } = data
        if (action === UPDATETASK) {
          responseData = yield ListServices.updateTask(task)
        } else {
          responseData = yield ListServices.completeUncompletetask(data)
        }
        break
      }
      case DELETE: {
        const { taskId } = payload
        responseData = yield ListServices.deleteTask(taskId)
        responseData.data = {taskId}
        break
      }
      default: {
        responseData = yield ListServices.getList()
      }
    }

    const { data, status } = responseData
    yield put(requestSuccess({
      method,
      data,
    }))
  } catch (e) {
    console.log('Error', e)
    yield put(requestFailure())
  }
}

export default listWatcher
