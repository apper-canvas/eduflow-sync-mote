import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import contactService from '../services/api/contactService'
import activityService from '../services/api/activityService'
import taskService from '../services/api/taskService'

const MainFeature = ({ contacts, activities, tasks, onContactsUpdate, onActivitiesUpdate, onTasksUpdate }) => {
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showContactForm, setShowContactForm] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [loading, setLoading] = useState(false)

  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentType: 'Prospective',
    enrollmentStatus: 'Inquiry',
    grade: '',
    parentName: '',
    parentEmail: '',
    address: '',
    dateOfBirth: ''
  })

  const [activityForm, setActivityForm] = useState({
    type: 'Note',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending'
  })

  const resetForms = () => {
    setContactForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      studentType: 'Prospective',
      enrollmentStatus: 'Inquiry',
      grade: '',
      parentName: '',
      parentEmail: '',
      address: '',
      dateOfBirth: ''
    })
    setActivityForm({
      type: 'Note',
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    })
    setTaskForm({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      status: 'Pending'
    })
  }

  const filteredContacts = contacts?.filter(contact => {
    const matchesSearch = `${contact.firstName} ${contact.lastName} ${contact.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contact.enrollmentStatus === statusFilter
    return matchesSearch && matchesStatus
  }) || []

  const getContactActivities = (contactId) => {
    return activities?.filter(activity => activity.contactId === contactId) || []
  }

  const getContactTasks = (contactId) => {
    return tasks?.filter(task => task.contactId === contactId) || []
  }

  const handleCreateContact = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newContact = await contactService.create(contactForm)
      onContactsUpdate([...contacts, newContact])
      setShowContactForm(false)
      resetForms()
      toast.success('Contact created successfully!')
    } catch (error) {
      toast.error('Failed to create contact')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateContact = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const updatedContact = await contactService.update(editingContact.id, contactForm)
      onContactsUpdate(contacts.map(c => c.id === editingContact.id ? updatedContact : c))
      setEditingContact(null)
      setShowContactForm(false)
      resetForms()
      toast.success('Contact updated successfully!')
    } catch (error) {
      toast.error('Failed to update contact')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return
    
    setLoading(true)
    try {
      await contactService.delete(contactId)
      onContactsUpdate(contacts.filter(c => c.id !== contactId))
      setSelectedContact(null)
      toast.success('Contact deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete contact')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateActivity = async (e) => {
    e.preventDefault()
    if (!selectedContact) return
    
    setLoading(true)
    try {
      const newActivity = await activityService.create({
        ...activityForm,
        contactId: selectedContact.id
      })
      onActivitiesUpdate([...activities, newActivity])
      setShowActivityForm(false)
      resetForms()
      toast.success('Activity added successfully!')
    } catch (error) {
      toast.error('Failed to add activity')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (!selectedContact) return
    
    setLoading(true)
    try {
      const newTask = await taskService.create({
        ...taskForm,
        contactId: selectedContact.id
      })
      onTasksUpdate([...tasks, newTask])
      setShowTaskForm(false)
      resetForms()
      toast.success('Task created successfully!')
    } catch (error) {
      toast.error('Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteTask = async (taskId) => {
    setLoading(true)
    try {
      const updatedTask = await taskService.update(taskId, {
        status: 'Completed',
        completedAt: new Date().toISOString()
      })
      onTasksUpdate(tasks.map(t => t.id === taskId ? updatedTask : t))
      toast.success('Task completed!')
    } catch (error) {
      toast.error('Failed to complete task')
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (contact) => {
    setEditingContact(contact)
    setContactForm({
      firstName: contact.firstName || '',
      lastName: contact.lastName || '',
      email: contact.email || '',
      phone: contact.phone || '',
      studentType: contact.studentType || 'Prospective',
      enrollmentStatus: contact.enrollmentStatus || 'Inquiry',
      grade: contact.grade || '',
      parentName: contact.parentName || '',
      parentEmail: contact.parentEmail || '',
      address: contact.address || '',
      dateOfBirth: contact.dateOfBirth || ''
    })
    setShowContactForm(true)
  }

  const getStatusColor = (status) => {
    const colors = {
      'Inquiry': 'bg-blue-100 text-blue-800',
      'Application Started': 'bg-yellow-100 text-yellow-800',
      'Application Submitted': 'bg-purple-100 text-purple-800',
      'Accepted': 'bg-green-100 text-green-800',
      'Enrolled': 'bg-emerald-100 text-emerald-800',
      'Rejected': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    }
    return colors[priority] || 'text-gray-600'
  }

  return (
    <div className="flex h-full">
      {/* Contact List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Contacts</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetForms()
                setEditingContact(null)
                setShowContactForm(true)
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Contact</span>
            </motion.button>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          
          {/* Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Application Started">Application Started</option>
            <option value="Application Submitted">Application Submitted</option>
            <option value="Accepted">Accepted</option>
            <option value="Enrolled">Enrolled</option>
          </select>
        </div>
        
        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <ApperIcon name="Users" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No contacts found</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <motion.div
                key={contact.id}
                whileHover={{ backgroundColor: '#f9fafb' }}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  selectedContact?.id === contact.id ? 'bg-primary-50 border-primary-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {contact.firstName?.[0]}{contact.lastName?.[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                    <div className="mt-1">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.enrollmentStatus)}`}>
                        {contact.enrollmentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Contact Detail Panel */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Contact Header */}
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-medium">
                      {selectedContact.firstName?.[0]}{selectedContact.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </h2>
                    <p className="text-gray-600">{selectedContact.email}</p>
                    <div className="mt-1">
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedContact.enrollmentStatus)}`}>
                        {selectedContact.enrollmentStatus}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startEdit(selectedContact)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4" />
                    <span>Edit</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteContact(selectedContact.id)}
                    className="px-4 py-2 text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                    <span>Delete</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Contact Details & Activity */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-gray-500">Phone</label>
                    <p className="text-gray-900">{selectedContact.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-gray-500">Student Type</label>
                    <p className="text-gray-900">{selectedContact.studentType}</p>
                  </div>
                  <div>
                    <label className="text-gray-500">Grade</label>
                    <p className="text-gray-900">{selectedContact.grade || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-gray-500">Parent</label>
                    <p className="text-gray-900">{selectedContact.parentName || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Activities</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowActivityForm(true)}
                    className="px-3 py-1 text-sm bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors duration-200"
                  >
                    Add Activity
                  </motion.button>
                </div>
                
                <div className="space-y-3">
                  {getContactActivities(selectedContact.id).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <ApperIcon name="MessageCircle" className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <span className="text-xs text-gray-500">{activity.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          {activity.type}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {getContactActivities(selectedContact.id).length === 0 && (
                    <p className="text-gray-500 text-center py-8">No activities yet</p>
                  )}
                </div>
              </div>

              {/* Tasks */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Tasks</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTaskForm(true)}
                    className="px-3 py-1 text-sm bg-accent text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                  >
                    Add Task
                  </motion.button>
                </div>
                
                <div className="space-y-3">
                  {getContactTasks(selectedContact.id).map((task) => (
                    <div key={task.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => task.status !== 'Completed' && handleCompleteTask(task.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          task.status === 'Completed'
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        {task.status === 'Completed' && (
                          <ApperIcon name="Check" className="w-3 h-3 text-white" />
                        )}
                      </motion.button>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-gray-500">{task.dueDate}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      </div>
                    </div>
                  ))}
                  
                  {getContactTasks(selectedContact.id).length === 0 && (
                    <p className="text-gray-500 text-center py-8">No tasks yet</p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <ApperIcon name="UserCircle" className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Select a contact</p>
              <p className="text-sm">Choose a contact from the list to view details</p>
            </div>
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowContactForm(false)
              setEditingContact(null)
              resetForms()
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h3>
              
              <form onSubmit={editingContact ? handleUpdateContact : handleCreateContact} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Type</label>
                    <select
                      value={contactForm.studentType}
                      onChange={(e) => setContactForm({...contactForm, studentType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    >
                      <option value="Prospective">Prospective</option>
                      <option value="Current">Current</option>
                      <option value="Alumni">Alumni</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={contactForm.enrollmentStatus}
                      onChange={(e) => setContactForm({...contactForm, enrollmentStatus: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    >
                      <option value="Inquiry">Inquiry</option>
                      <option value="Application Started">Application Started</option>
                      <option value="Application Submitted">Application Submitted</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Enrolled">Enrolled</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <input
                    type="text"
                    value={contactForm.grade}
                    onChange={(e) => setContactForm({...contactForm, grade: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={contactForm.parentName}
                    onChange={(e) => setContactForm({...contactForm, parentName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowContactForm(false)
                      setEditingContact(null)
                      resetForms()
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingContact ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activity Form Modal */}
      <AnimatePresence>
        {showActivityForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowActivityForm(false)
              resetForms()
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Activity</h3>
              
              <form onSubmit={handleCreateActivity} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={activityForm.type}
                    onChange={(e) => setActivityForm({...activityForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    <option value="Note">Note</option>
                    <option value="Call">Call</option>
                    <option value="Email">Email</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Application Review">Application Review</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={activityForm.title}
                    onChange={(e) => setActivityForm({...activityForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={activityForm.description}
                    onChange={(e) => setActivityForm({...activityForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={activityForm.date}
                    onChange={(e) => setActivityForm({...activityForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowActivityForm(false)
                      resetForms()
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add Activity'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowTaskForm(false)
              resetForms()
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Task</h3>
              
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTaskForm(false)
                      resetForms()
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Task'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature