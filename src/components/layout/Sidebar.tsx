import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faHome, faPlayCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

interface SidebarLink {
  icon: IconDefinition;
  text: string;
  to: string;
}

interface SidebarProps {
  mode?: 'expanded' | 'mini';
}

const Sidebar: React.FC<SidebarProps> = ({ mode = 'expanded' }) => {
  const location = useLocation();

  const mainLinks: SidebarLink[] = [
    { icon: faHome, text: 'Home', to: '/' },
    { icon: faCompass, text: 'Shorts', to: '/shorts' },
    { icon: faPlayCircle, text: 'Subscriptions', to: '/subscription' },
    { icon: faUser, text: 'You', to: '/history' },
  ];

  if (mode === 'mini') {
    return (
      <div className="h-full bg-[#0f0f0f] text-white flex flex-col items-center pt-1 overflow-y-auto no-scrollbar">
        {mainLinks.map((link, index) => {
          const isActive = location.pathname === link.to || (link.to === '/' && location.pathname === '/');
          return (
            <Link
              key={index}
              to={link.to}
              className={`w-full flex flex-col items-center justify-center py-4 px-1 hover:bg-[#272727] transition-colors ${isActive ? 'font-medium' : 'font-normal'}`}
            >
              <FontAwesomeIcon icon={link.icon} className="text-[19px] mb-1.5 text-gray-100" />
              <span className="text-[10px] text-gray-100 truncate w-full text-center">{link.text}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="h-full bg-[#0f0f0f] text-white overflow-y-auto custom-scrollbar pb-6 pt-2 pr-1">
      {mainLinks.map((link, index) => {
        const isActive = location.pathname === link.to || (link.to === '/' && location.pathname === '/');
        return (
          <Link
            key={index}
            to={link.to}
            className={`flex items-center px-3 py-2.5 mx-3 rounded-xl hover:bg-[#272727] transition-colors ${isActive ? 'bg-[#272727] font-semibold' : 'font-normal'}`}
          >
            <div className="w-6 mr-6 flex justify-center items-center">
              <FontAwesomeIcon icon={link.icon} className="text-lg text-gray-100" />
            </div>
            <span className="text-sm text-gray-100 truncate">{link.text}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
