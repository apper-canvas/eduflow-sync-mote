import enrollmentData from '../mockData/enrollments.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class EnrollmentService {
  constructor() {
    this.data = [...enrollmentData]
  }

  async getAll() {
    await delay(320)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const enrollment = this.data.find(item => item.id === id)
    return enrollment ? { ...enrollment } : null
  }

  async create(enrollmentData) {
    await delay(400)
    const newEnrollment = {
      ...enrollmentData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.data.push(newEnrollment)
    return { ...newEnrollment }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Enrollment not found')
    }
    
    this.data[index] = {
      ...this.data[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(300)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Enrollment not found')
    }
    
    this.data.splice(index, 1)
    return true
  }
}

export default new EnrollmentService()