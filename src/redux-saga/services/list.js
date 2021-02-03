import axios from 'axios'

const url = `http://tiny-list.herokuapp.com/api/v1/users/117/tasks`

class ListServices {
  static async getList() {
    const { data, status } = await axios.get(url)
    return { data, status }
  }
  static async createTask(task) {
    const { data, status } = await axios.post(url, { task })
    return { data, status }
  }
  static async completeUncompletetask({ id, action }) {
    const { data, status } = await axios.put(`${url}/${id}/${action}`)
    return { data, status }
  }
  static async updateTask({ id, ...task }) {
    const { data, status } = await axios.put(`${url}/${id}`, { task })
    return { data, status }
  }
  static async deleteTask(id) {
    const { data, status } = await axios.delete(`${url}/${id}`)
    return { data, status }
  }
}

export default ListServices
