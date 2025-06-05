import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Modal from '../atoms/Modal';

const TaskForm = ({ isOpen, onClose, form, onFormChange, onSubmit, loading }) => {
  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Task">
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          label="Title"
          type="text"
          required
          value={form.title}
          onChange={(e) => onFormChange({ ...form, title: e.target.value })}
        />
        <FormField
          label="Description"
          type="textarea"
          rows={3}
          value={form.description}
          onChange={(e) => onFormChange({ ...form, description: e.target.value })}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Due Date"
            type="date"
            value={form.dueDate}
            onChange={(e) => onFormChange({ ...form, dueDate: e.target.value })}
          />
          <FormField
            label="Priority"
            type="select"
            value={form.priority}
            onChange={(e) => onFormChange({ ...form, priority: e.target.value })}
            options={priorityOptions}
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" disabled={loading}>
            {loading ? 'Creating...' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;