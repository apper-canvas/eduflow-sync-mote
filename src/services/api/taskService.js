import taskData from '../mockData/tasks.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class TaskService {
  constructor() {
    this.data = [...taskData]
  }

  async getAll() {
    await delay(280)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const task = this.data.find(item => item.id === id)
    return task ? { ...task } : null
  }

  async create(taskData) {
    await delay(350)
    const newTask = {
      ...taskData,
      id: Date.now(),
      assignedTo: 'Current User',
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    this.data.push(newTask)
    return { ...newTask }
  }

  async update(id, updateData) {
    await delay(300)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.data[index] = {
      ...this.data[index],
      ...updateData
    }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.data.splice(index, 1)
    return true
  }
}

export default new TaskService()