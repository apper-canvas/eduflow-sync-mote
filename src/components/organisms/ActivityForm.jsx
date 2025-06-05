import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Modal from '../atoms/Modal';

const ActivityForm = ({ isOpen, onClose, form, onFormChange, onSubmit, loading }) => {
  const activityTypeOptions = [
    { value: 'Note', label: 'Note' },
    { value: 'Call', label: 'Call' },
    { value: 'Email', label: 'Email' },
    { value: 'Meeting', label: 'Meeting' },
    { value: 'Application Review', label: 'Application Review' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Activity">
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          label="Type"
          type="select"
          value={form.type}
          onChange={(e) => onFormChange({ ...form, type: e.target.value })}
          options={activityTypeOptions}
        />
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
          required
          value={form.description}
          onChange={(e) => onFormChange({ ...form, description: e.target.value })}
        />
        <FormField
          label="Date"
          type="date"
          required
          value={form.date}
          onChange={(e) => onFormChange({ ...form, date: e.target.value })}
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="secondary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Activity'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ActivityForm;