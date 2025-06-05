import React from 'react';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import ApperIcon from '../ApperIcon';
import ContactCard from '../molecules/ContactCard';
import SearchInput from '../molecules/SearchInput';
import Select from '../atoms/Select';
import Paragraph from '../atoms/Paragraph';

const ContactList = ({
  contacts,
  searchTerm,
  onSearchTermChange,
  statusFilter,
  onStatusFilterChange,
  onAddContact,
  onSelectContact,
  selectedContact,
  getStatusColor
}) => {
  const enrollmentStatusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Inquiry', label: 'Inquiry' },
    { value: 'Application Started', label: 'Application Started' },
    { value: 'Application Submitted', label: 'Application Submitted' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Enrolled', label: 'Enrolled' },
  ];

  const filteredContacts = contacts?.filter(contact => {
    const matchesSearch = `${contact.firstName} ${contact.lastName} ${contact.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contact.enrollmentStatus === statusFilter
    return matchesSearch && matchesStatus
  }) || [];

  return (
    <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <Heading level={3}>Contacts</Heading>
          <Button icon="Plus" onClick={onAddContact}>
            Add Contact
          </Button>
        </div>
        
        {/* Search */}
        <div className="mb-4">
          <SearchInput
            searchTerm={searchTerm}
            onSearchChange={onSearchTermChange}
            placeholder="Search contacts..."
          />
        </div>
        
        {/* Filter */}
        <Select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          options={enrollmentStatusOptions}
        />
      </div>
      
      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <ApperIcon name="Users" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <Paragraph>No contacts found</Paragraph>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={selectedContact?.id === contact.id}
              onClick={onSelectContact}
              getStatusColor={getStatusColor}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;