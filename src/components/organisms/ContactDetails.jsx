import React from 'react';
import Avatar from '../atoms/Avatar';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import ActivityCard from '../molecules/ActivityCard';
import TaskCard from '../molecules/TaskCard';
import ApperIcon from '../ApperIcon';

const ContactDetails = ({
  selectedContact,
  onEdit,
  onDelete,
  onAddActivity,
  onAddTask,
  getContactActivities,
  getContactTasks,
  getStatusColor,
  getPriorityColor
}) => {
  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <ApperIcon name="UserCircle" className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <Heading level={3} className="text-lg font-medium text-gray-500">Select a contact</Heading>
          <Paragraph className="text-sm">Choose a contact from the list to view details</Paragraph>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Contact Header */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar initials={`${selectedContact.firstName?.[0]}${selectedContact.lastName?.[0]}`} size="large" />
            <div>
              <Heading level={2}>{selectedContact.firstName} {selectedContact.lastName}</Heading>
              <Paragraph className="text-gray-600">{selectedContact.email}</Paragraph>
              <div className="mt-1">
                <Badge colorClass={getStatusColor(selectedContact.enrollmentStatus)}>
                  {selectedContact.enrollmentStatus}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" icon="Edit" onClick={() => onEdit(selectedContact)}>
              Edit
            </Button>
            <Button variant="danger" icon="Trash2" onClick={() => onDelete(selectedContact.id)}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Details & Activity */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Contact Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <Heading level={3} className="font-semibold text-gray-900 mb-3">Contact Information</Heading>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-gray-500">Phone</Label>
              <Paragraph className="text-gray-900">{selectedContact.phone || 'Not provided'}</Paragraph>
            </div>
            <div>
              <Label className="text-gray-500">Student Type</Label>
              <Paragraph className="text-gray-900">{selectedContact.studentType}</Paragraph>
            </div>
            <div>
              <Label className="text-gray-500">Grade</Label>
              <Paragraph className="text-gray-900">{selectedContact.grade || 'Not specified'}</Paragraph>
            </div>
            <div>
              <Label className="text-gray-500">Parent</Label>
              <Paragraph className="text-gray-900">{selectedContact.parentName || 'Not provided'}</Paragraph>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Heading level={3} className="font-semibold">Activities</Heading>
            <Button variant="secondary" size="small" onClick={onAddActivity}>
              Add Activity
            </Button>
          </div>
          
          <div className="space-y-3">
            {getContactActivities(selectedContact.id).length === 0 ? (
              <Paragraph className="text-gray-500 text-center py-8">No activities yet</Paragraph>
            ) : (
              getContactActivities(selectedContact.id).map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            )}
          </div>
        </div>

        {/* Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Heading level={3} className="font-semibold">Tasks</Heading>
            <Button variant="accent" size="small" onClick={onAddTask}>
              Add Task
            </Button>
          </div>
          
          <div className="space-y-3">
            {getContactTasks(selectedContact.id).length === 0 ? (
              <Paragraph className="text-gray-500 text-center py-8">No tasks yet</Paragraph>
            ) : (
              getContactTasks(selectedContact.id).map((task) => (
                <TaskCard key={task.id} task={task} onCompleteTask={getContactTasks.onCompleteTask} getPriorityColor={getPriorityColor} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;