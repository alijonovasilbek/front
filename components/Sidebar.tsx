
import React from 'react';
import type { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  
  // Fix: Replaced JSX.Element with React.ReactElement to resolve namespace error.
  const navItems: { name: Page; icon: React.ReactElement }[] = [
    { name: 'Dashboard', icon: <HomeIcon /> },
    { name: 'Students', icon: <UsersIcon /> },
    { name: 'Groups', icon: <CollectionIcon /> },
    { name: 'Payments', icon: <CreditCardIcon /> },
    { name: 'StudentPortal', icon: <UserCircleIcon /> },
  ];

  // Fix: Replaced JSX.Element with React.ReactElement to resolve namespace error.
  const NavLink: React.FC<{item: {name: Page, icon: React.ReactElement}}> = ({ item }) => {
    const isActive = currentPage === item.name;
    return (
      <button
        onClick={() => setCurrentPage(item.name)}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg ${
          isActive
            ? 'bg-bunyodkor-yellow text-bunyodkor-blue'
            : 'text-white hover:bg-white/10'
        }`}
      >
        <span className="w-6 h-6 mr-3">{item.icon}</span>
        <span>{item.name === 'StudentPortal' ? 'Student Portal' : item.name}</span>
      </button>
    );
  };
  
  return (
    <aside className="w-64 flex-shrink-0 bg-bunyodkor-blue text-white flex flex-col p-4">
      <div className="flex items-center mb-8 px-2">
         <svg className="w-12 h-12 text-bunyodkor-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 00-9.4 13.57l5.9 5.9a10 10 0 0013.57 0l5.9-5.9A10 10 0 0012 2zm-1.06 9.54L9 13.5l1.06 1.06L12 12.5l1.94 1.94L15 13.5l-1.94-1.94L15 9.5l-1.06-1.06L12 10.5l-1.94-1.94L9 9.5l1.94 1.94z" />
        </svg>
        <div className="ml-3">
            <h1 className="text-xl font-bold">Bunyodkor</h1>
            <p className="text-xs text-yellow-200">Academy CRM</p>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map(item => <NavLink key={item.name} item={item} />)}
      </nav>
      <div className="mt-auto">
          <div className="text-center text-xs text-gray-300 p-4">
              <p>&copy; {new Date().getFullYear()} Bunyodkor FC</p>
              <p>All Rights Reserved</p>
          </div>
      </div>
    </aside>
  );
};


// Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-6-6h6a6 6 0 006 6" />
  </svg>
);
const CollectionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0a2 2 0 002 2m0 0V9a2 2 0 01-2-2m-2 11v-2a2 2 0 00-2-2H7a2 2 0 00-2 2v2" />
  </svg>
);
const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);
const UserCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export default Sidebar;
