import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Role } from '../../types';
import { SharedIcons } from '../common/Icons';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end={to === '/home'}
    className={({ isActive }) =>
      `flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-primary-purple text-white shadow-lg'
          : 'text-gray-400 hover:bg-dark-card hover:text-white'
      }`
    }
  >
    {icon}
    <span className="font-semibold">{label}</span>
  </NavLink>
);

const NavSection: React.FC<{title: string}> = ({ title }) => (
    <h2 className="px-4 pt-4 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h2>
);

const Sidebar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    { section: 'Platform', to: '/home', icon: <SharedIcons.Home />, label: 'Dashboard' },
    { section: 'Distribution', to: '/music/dashboard', icon: <SharedIcons.Music />, label: 'Music' },
    { section: 'Distribution', to: '/publishing/dashboard', icon: <SharedIcons.Publishing />, label: 'Publishing' },
    { section: 'E-commerce', to: '/ecommerce/dashboard', icon: <SharedIcons.Store />, label: 'Store' },
    { section: 'Marketing & Promotion', to: '/marketing/campaigns', icon: <SharedIcons.Campaigns />, label: 'Campaigns' },
    { section: 'Marketing & Promotion', to: '/marketing/calendar', icon: <SharedIcons.Calendar />, label: 'Calendar' },
    { section: 'Marketing & Promotion', to: '/marketing/social-media', icon: <SharedIcons.SocialMedia />, label: 'Social Media' },
    { section: 'Marketing & Promotion', to: '/marketing/media-monitoring', icon: <SharedIcons.MediaMonitoring />, label: 'Media Monitoring' },
    { section: 'Marketing & Promotion', to: '/marketing/analytics', icon: <SharedIcons.Analytics />, label: 'Music Analytics' },
    { section: 'Marketing & Promotion', to: '/marketing/creative-studio', icon: <SharedIcons.CreativeStudio />, label: 'Creative Studio' },
    { section: 'Marketing & Promotion', to: '/marketing/press-release', icon: <SharedIcons.PressRelease />, label: 'Press Release' },
    { section: 'Marketing & Promotion', to: '/marketing/contacts', icon: <SharedIcons.Contacts />, label: 'Contacts' },
    { section: 'Marketing & Promotion', to: '/marketing/content-library', icon: <SharedIcons.ContentLibrary />, label: 'Content Library' },
    { section: 'Marketing & Promotion', to: '/marketing/smart-links', icon: SharedIcons.SmartLink, label: 'Smart Links' },
    { section: 'Marketing & Promotion', to: '/marketing/ai-studio', icon: SharedIcons.AIStudio, label: 'AI Studio' },
    { section: 'Marketing & Promotion', to: '/marketing/ai-assistant', icon: <SharedIcons.AIAssistant />, label: 'AI Assistant' },
    { section: 'Platform', to: '/settings', icon: <SharedIcons.Settings />, label: 'Settings' },
  ];
  
  const groupedNav = navItems.reduce((acc, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);


  return (
    <aside className="w-64 bg-dark-bg border-r border-dark-border flex flex-col p-4 fixed h-full">
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-white tracking-wider">
          Hardban<span className="text-primary-purple">Records</span>
        </h1>
      </div>
      <nav className="flex-1 space-y-2 mt-2">
        {Object.entries(groupedNav).map(([section, items]) => (
            <div key={section}>
                <NavSection title={section} />
                {items.map((item) => (
                    <NavItem key={item.to} to={item.to} icon={item.icon} label={user?.role === Role.ADMIN ? item.label : item.label.replace('Music', 'My Music').replace('Publishing', 'My Books').replace('Store', 'My Store')} />
                ))}
            </div>
        ))}
      </nav>
      <div className="mt-auto">
         <button
            onClick={logout}
            className="flex items-center space-x-4 px-4 py-3 rounded-lg w-full text-gray-400 hover:bg-dark-card hover:text-error-red transition-colors"
        >
            <SharedIcons.Logout />
            <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;