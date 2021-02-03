import { CREATE, UPDATE, DELETE } from './constants'

export const updateList = (state, action = {}) => {
  const { payload = {} } = action
  const { method, data } = payload
  const { taskList = [] } = state
  let updatedList = []
  switch (method) {
    case CREATE: {
      updatedList = [data, ...taskList]
      break
    }
    case UPDATE: {
      updatedList = taskList.map((ele) => {
        if (data.id === ele.id) {
          return data
        }
        return ele
      })
      break
    }
    case DELETE: {
      const { taskId } = data
      updatedList = taskList.filter((ele) => (ele.id !== taskId))
      break
    }
    default: {
      updatedList = data
      break
    }
  }

  return { isLoading: false, success: true, error: false, taskList: sorting(updatedList) }
}

const sorting = (taskList) => {
  let completed = taskList.filter((ele) => Boolean(ele.completed_at));
  let uncompleted = taskList.filter((ele) => !Boolean(ele.completed_at));
  const com = completed.slice().sort((a, b) => b.completed_at - a.completed_at);
  const uncom = uncompleted.slice().sort((a, b) => a.created_at - b.created_at);
  return taskList = [...uncom, ...com];
}

