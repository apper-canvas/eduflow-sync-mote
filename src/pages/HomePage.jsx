import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import contactService from '../services/api/contactService'
import activityService from '../services/api/activityService'
import taskService from '../services/api/taskService'
import pipelineStageService from '../services/api/pipelineStageService'
import enrollmentService from '../services/api/enrollmentService'

const Home = () => {
  const [activeSection, setActiveSection] = useState('contacts')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [contacts, setContacts] = useState([])
  const [activities, setActivities] = useState([])
  const [tasks, setTasks] = useState([])
  const [stages, setStages] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [contactsData, activitiesData, tasksData, stagesData, enrollmentsData] = await Promise.all([
          contactService.getAll(),
          activityService.getAll(),
          taskService.getAll(),
          pipelineStageService.getAll(),
          enrollmentService.getAll()
        ])
        setContacts(contactsData || [])
        setActivities(activitiesData || [])
        setTasks(tasksData || [])
        setStages(stagesData || [])
        setEnrollments(enrollmentsData || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const navigationItems = [
    { id: 'contacts', label: 'Contacts', icon: 'Users', active: true },
    { id: 'pipeline', label: 'Pipeline', icon: 'GitBranch', active: true },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare', active: true },
    { id: 'activities', label: 'Activities', icon: 'Activity', active: true },
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3', active: false },
    { id: 'communications', label: 'Communications', icon: 'MessageSquare', active: false },
    { id: 'reports', label: 'Reports', icon: 'FileText', active: false },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar', active: false },
  ]

  const renderPlaceholder = (title, description, comingSoon = true) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-96 text-center p-8"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6">
        <ApperIcon name="Sparkles" className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-600 mb-4 max-w-md">{description}</p>
      {comingSoon && (
        <div className="px-4 py-2 bg-accent text-white rounded-full text-sm font-medium">
          Coming Soon - Q2 2024
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="bg-white shadow-soft border-r border-gray-200 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
              <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3"
                >
                  <h1 className="text-xl font-bold text-gray-900">EduFlow</h1>
                  <p className="text-sm text-gray-500">CRM Platform</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => item.active && setActiveSection(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id && item.active
                  ? 'bg-primary text-white shadow-soft'
                  : item.active
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!item.active && !sidebarCollapsed && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-gray-200">
          <motion.button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ApperIcon 
              name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} 
              className="w-5 h-5" 
            />
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {activeSection}
            </h2>
            {loading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Loading...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-64"
              />
            </div>
            
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="Bell" className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
            </motion.button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Admin User</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <ApperIcon name="AlertCircle" className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeSection === 'contacts' && (
                  <MainFeature 
                    contacts={contacts}
                    activities={activities}
                    tasks={tasks}
                    onContactsUpdate={setContacts}
                    onActivitiesUpdate={setActivities}
                    onTasksUpdate={setTasks}
                  />
                )}
                {activeSection === 'pipeline' && renderPlaceholder(
                  "Enrollment Pipeline",
                  "Visual kanban board to track student progress through admission stages with drag-and-drop functionality."
                )}
                {activeSection === 'tasks' && renderPlaceholder(
                  "Task Management",
                  "Create, assign, and track follow-up tasks with due dates and priority levels."
                )}
                {activeSection === 'activities' && renderPlaceholder(
                  "Activity Timeline",
                  "Comprehensive view of all student interactions, communications, and touchpoints."
                )}
                {activeSection === 'dashboard' && renderPlaceholder(
                  "Analytics Dashboard",
                  "Comprehensive insights and metrics about student engagement, enrollment trends, and performance indicators."
                )}
                {activeSection === 'communications' && renderPlaceholder(
                  "Email & SMS Center",
                  "Integrated communication hub for sending personalized messages and automated campaigns to students and parents."
                )}
                {activeSection === 'reports' && renderPlaceholder(
                  "Advanced Reporting",
                  "Generate detailed reports on enrollment metrics, student progress, and institutional performance."
                )}
                {activeSection === 'calendar' && renderPlaceholder(
                  "Event Management",
                  "Schedule and manage important dates, deadlines, meetings, and institutional events."
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default Home