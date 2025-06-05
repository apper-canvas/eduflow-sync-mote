import React from 'react';
import ContactList from '../organisms/ContactList';
import ContactDetails from '../organisms/ContactDetails';
import ContactForm from '../organisms/ContactForm';
import ActivityForm from '../organisms/ActivityForm';
import TaskForm from '../organisms/TaskForm';

const MainFeatureTemplate = ({
  contacts, activities, tasks,
  selectedContact, setSelectedContact,
  searchTerm, setSearchTerm,
  statusFilter, setStatusFilter,
  showContactForm, setShowContactForm,
  showActivityForm, setShowActivityForm,
  showTaskForm, setShowTaskForm,
  editingContact, setEditingContact,
  contactForm, setContactForm,
  activityForm, setActivityForm,
  taskForm, setTaskForm,
  loading,
  resetForms,
  handleCreateContact,
  handleUpdateContact,
  handleDeleteContact,
  handleCreateActivity,
  handleCreateTask,
  handleCompleteTask,
  getStatusColor,
  getPriorityColor
}) => {
  const getContactActivities = (contactId) => {
    return activities?.filter(activity => activity.contactId === contactId) || [];
  };

  const getContactTasks = (contactId) => {
    return tasks?.filter(task => task.contactId === contactId) || [];
  };

  const startEdit = (contact) => {
    setEditingContact(contact);
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
    });
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
    setEditingContact(null);
    resetForms();
  };

  const handleCloseActivityForm = () => {
    setShowActivityForm(false);
    resetForms();
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    resetForms();
  };

  return (
    <div className="flex h-full">
      <ContactList
        contacts={contacts}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onAddContact={() => { resetForms(); setEditingContact(null); setShowContactForm(true); }}
        onSelectContact={setSelectedContact}
        selectedContact={selectedContact}
        getStatusColor={getStatusColor}
      />

      <ContactDetails
        selectedContact={selectedContact}
        onEdit={startEdit}
        onDelete={handleDeleteContact}
        onAddActivity={() => setShowActivityForm(true)}
        onAddTask={() => setShowTaskForm(true)}
        getContactActivities={getContactActivities}
        getContactTasks={{ 
            list: getContactTasks, 
            onCompleteTask: handleCompleteTask 
        }}
        getStatusColor={getStatusColor}
        getPriorityColor={getPriorityColor}
      />

      <ContactForm
        isOpen={showContactForm}
        onClose={handleCloseContactForm}
        form={contactForm}
        onFormChange={setContactForm}
        onSubmit={editingContact ? handleUpdateContact : handleCreateContact}
        loading={loading}
        editingContact={editingContact}
      />

      <ActivityForm
        isOpen={showActivityForm}
        onClose={handleCloseActivityForm}
        form={activityForm}
        onFormChange={setActivityForm}
        onSubmit={handleCreateActivity}
        loading={loading}
      />

      <TaskForm
        isOpen={showTaskForm}
        onClose={handleCloseTaskForm}
        form={taskForm}
        onFormChange={setTaskForm}
        onSubmit={handleCreateTask}
        loading={loading}
      />
    </div>
  );
};

export default MainFeatureTemplate;