import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';
import PlaceholderSection from '../organisms/PlaceholderSection';
import ApperIcon from '../ApperIcon';
import Paragraph from '../atoms/Paragraph';

const HomeTemplate = ({
  activeSection,
  setActiveSection,
  sidebarCollapsed,
  setSidebarCollapsed,
  navigationItems,
  loading,
  error,
  children
}) => {
  const renderPlaceholder = (title, description, iconName) => (
    <PlaceholderSection title={title} description={description} iconName={iconName} />
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        navigationItems={navigationItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header activeSection={activeSection} loading={loading} onSearch={() => {}} />

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
                    <Paragraph className="text-red-700">{error}</Paragraph>
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
                {activeSection === 'contacts' && children}
                {activeSection === 'pipeline' && renderPlaceholder(
                  "Enrollment Pipeline",
                  "Visual kanban board to track student progress through admission stages with drag-and-drop functionality.",
                  "GitBranch"
                )}
                {activeSection === 'tasks' && renderPlaceholder(
                  "Task Management",
                  "Create, assign, and track follow-up tasks with due dates and priority levels.",
                  "CheckSquare"
                )}
                {activeSection === 'activities' && renderPlaceholder(
                  "Activity Timeline",
                  "Comprehensive view of all student interactions, communications, and touchpoints.",
                  "Activity"
                )}
                {activeSection === 'dashboard' && renderPlaceholder(
                  "Analytics Dashboard",
                  "Comprehensive insights and metrics about student engagement, enrollment trends, and performance indicators.",
                  "BarChart3"
                )}
                {activeSection === 'communications' && renderPlaceholder(
                  "Email & SMS Center",
                  "Integrated communication hub for sending personalized messages and automated campaigns to students and parents.",
                  "MessageSquare"
                )}
                {activeSection === 'reports' && renderPlaceholder(
                  "Advanced Reporting",
                  "Generate detailed reports on enrollment metrics, student progress, and institutional performance.",
                  "FileText"
                )}
                {activeSection === 'calendar' && renderPlaceholder(
                  "Event Management",
                  "Schedule and manage important dates, deadlines, meetings, and institutional events.",
                  "Calendar"
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default HomeTemplate;