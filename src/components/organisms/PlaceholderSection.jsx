import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Badge from '../atoms/Badge';

const PlaceholderSection = ({ title, description, iconName = "Sparkles", comingSoon = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full text-center p-8"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6">
        <ApperIcon name={iconName} className="w-12 h-12 text-white" />
      </div>
      <Heading level={2} className="mb-3">{title}</Heading>
      <Paragraph className="mb-4 max-w-md">{description}</Paragraph>
      {comingSoon && (
        <Badge colorClass="bg-accent text-white">
          Coming Soon - Q2 2024
        </Badge>
      )}
    </motion.div>
  );
};

export default PlaceholderSection;