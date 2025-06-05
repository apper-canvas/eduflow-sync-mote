import contactData from '../mockData/contacts.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ContactService {
  constructor() {
    this.data = [...contactData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const contact = this.data.find(item => item.id === id)
    return contact ? { ...contact } : null
  }

  async create(contactData) {
    await delay(400)
    const newContact = {
      ...contactData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.data.push(newContact)
    return { ...newContact }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Contact not found')
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
      throw new Error('Contact not found')
    }
    
    this.data.splice(index, 1)
    return true
  }
}

export default new ContactService()