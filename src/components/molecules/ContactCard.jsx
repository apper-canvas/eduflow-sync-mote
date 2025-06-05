import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '../atoms/Avatar';
import Badge from '../atoms/Badge';

const ContactCard = ({ contact, isSelected, onClick, getStatusColor }) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: '#f9fafb' }}
      onClick={() => onClick(contact)}
      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
        isSelected ? 'bg-primary-50 border-primary-200' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <Avatar initials={`${contact.firstName?.[0]}${contact.lastName?.[0]}`} size="medium" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">
            {contact.firstName} {contact.lastName}
          </p>
          <p className="text-sm text-gray-500 truncate">{contact.email}</p>
          <div className="mt-1">
            <Badge colorClass={getStatusColor(contact.enrollmentStatus)}>
              {contact.enrollmentStatus}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;