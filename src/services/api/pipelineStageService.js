import stageData from '../mockData/pipelineStages.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class PipelineStageService {
  constructor() {
    this.data = [...stageData]
  }

  async getAll() {
    await delay(200)
    return [...this.data]
  }

  async getById(id) {
    await delay(150)
    const stage = this.data.find(item => item.id === id)
    return stage ? { ...stage } : null
  }

  async create(stageData) {
    await delay(300)
    const newStage = {
      ...stageData,
      id: Date.now()
    }
    this.data.push(newStage)
    return { ...newStage }
  }

  async update(id, updateData) {
    await delay(250)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Stage not found')
    }
    
    this.data[index] = {
      ...this.data[index],
      ...updateData
    }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(200)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Stage not found')
    }
    
    this.data.splice(index, 1)
    return true
  }
}

export default new PipelineStageService()