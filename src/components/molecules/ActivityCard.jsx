import React from 'react';
import ApperIcon from '../ApperIcon';
import Card from '../atoms/Card';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Badge from '../atoms/Badge';

const ActivityCard = ({ activity }) => {
  return (
    <Card className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <ApperIcon name="MessageCircle" className="w-4 h-4 text-blue-600" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Heading level={4} className="font-medium">{activity.title}</Heading>
          <span className="text-xs text-gray-500">{activity.date}</span>
        </div>
        <Paragraph className="text-sm mt-1">{activity.description}</Paragraph>
        <Badge colorClass="bg-gray-100 text-gray-700 mt-2">{activity.type}</Badge>
      </div>
    </Card>
  );
};

export default ActivityCard;