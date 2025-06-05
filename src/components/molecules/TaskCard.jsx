import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import Card from '../atoms/Card';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

const TaskCard = ({ task, onCompleteTask, getPriorityColor }) => {
  return (
    <Card className="flex items-center space-x-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => task.status !== 'Completed' && onCompleteTask(task.id)}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
          task.status === 'Completed'
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {task.status === 'Completed' && (
          <ApperIcon name="Check" className="w-3 h-3 text-white" />
        )}
      </motion.button>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Heading level={4} className={`font-medium ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </Heading>
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500">{task.dueDate}</span>
          </div>
        </div>
        <Paragraph className="text-sm mt-1">{task.description}</Paragraph>
      </div>
    </Card>
  );
};

export default TaskCard;