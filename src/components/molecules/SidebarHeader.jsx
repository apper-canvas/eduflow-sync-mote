import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../atoms/Avatar';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

const SidebarHeader = ({ sidebarCollapsed }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center">
        <Avatar icon="GraduationCap" size="medium" />
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3"
            >
              <Heading level={1} className="text-xl font-bold">EduFlow</Heading>
              <Paragraph className="text-sm text-gray-500">CRM Platform</Paragraph>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SidebarHeader;