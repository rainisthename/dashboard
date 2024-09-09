import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-full p-4">
      <div className="flex items-center mb-6">
        <div className="text-xl font-semibold">Fikri Studio</div>
      </div>
      <ul className="space-y-4">
        <li className="text-gray-700 font-medium">Dashboard</li>
        <li className="text-gray-700 font-medium">Inbox</li>
        <li className="text-gray-700 font-medium">Notification</li>
        <li className="text-gray-700 font-medium">Ticket</li>
        <li className="text-gray-700 font-medium">Knowledge Base</li>
        <li className="text-gray-700 font-medium">Customer</li>
        <li className="text-gray-700 font-medium">Forum</li>
        <li className="text-gray-700 font-medium">Report</li>
      </ul>
    </div>
  );
};

export default Sidebar;
