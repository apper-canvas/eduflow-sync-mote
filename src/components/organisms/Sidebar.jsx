import React from 'react';
import { motion } from 'framer-motion';
import SidebarHeader from '../molecules/SidebarHeader';
import NavigationItem from '../molecules/NavigationItem';
import Button from '../atoms/Button';
import ApperIcon from '../ApperIcon';

const Sidebar = ({ sidebarCollapsed, setSidebarCollapsed, navigationItems, activeSection, setActiveSection }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 280 }}
      className="bg-white shadow-soft border-r border-gray-200 flex flex-col"
    >
      <SidebarHeader sidebarCollapsed={sidebarCollapsed} />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            activeSection={activeSection}
            sidebarCollapsed={sidebarCollapsed}
            onClick={setActiveSection}
          />
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          variant="text"
          className="w-full"
          icon={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
        />
      </div>
    </motion.aside>
  );
};

export default Sidebar;