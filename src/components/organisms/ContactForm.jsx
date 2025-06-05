import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Modal from '../atoms/Modal';

const ContactForm = ({ isOpen, onClose, form, onFormChange, onSubmit, loading, editingContact }) => {
  const studentTypeOptions = [
    { value: 'Prospective', label: 'Prospective' },
    { value: 'Current', label: 'Current' },
    { value: 'Alumni', label: 'Alumni' },
  ];

  const enrollmentStatusOptions = [
    { value: 'Inquiry', label: 'Inquiry' },
    { value: 'Application Started', label: 'Application Started' },
    { value: 'Application Submitted', label: 'Application Submitted' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Enrolled', label: 'Enrolled' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingContact ? 'Edit Contact' : 'Add New Contact'}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="First Name"
            type="text"
            required
            value={form.firstName}
            onChange={(e) => onFormChange({ ...form, firstName: e.target.value })}
          />
          <FormField
            label="Last Name"
            type="text"
            required
            value={form.lastName}
            onChange={(e) => onFormChange({ ...form, lastName: e.target.value })}
          />
        </div>
        
        <FormField
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => onFormChange({ ...form, email: e.target.value })}
        />
        
        <FormField
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(e) => onFormChange({ ...form, phone: e.target.value })}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Student Type"
            type="select"
            value={form.studentType}
            onChange={(e) => onFormChange({ ...form, studentType: e.target.value })}
            options={studentTypeOptions}
          />
          <FormField
            label="Status"
            type="select"
            value={form.enrollmentStatus}
            onChange={(e) => onFormChange({ ...form, enrollmentStatus: e.target.value })}
            options={enrollmentStatusOptions}
          />
        </div>
        
        <FormField
          label="Grade"
          type="text"
          value={form.grade}
          onChange={(e) => onFormChange({ ...form, grade: e.target.value })}
        />
        
        <FormField
          label="Parent Name"
          type="text"
          value={form.parentName}
          onChange={(e) => onFormChange({ ...form, parentName: e.target.value })}
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Saving...' : editingContact ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ContactForm;