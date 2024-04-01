import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlay } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

interface SidebarLink {
  icon: IconDefinition;
  text: string;
  to: string;
}

const Sidebar: React.FC = () => {
  const sidebarLinks: SidebarLink[] = [
    { icon: faHome, text: 'Home', to: '/' },
    { icon: faPlay, text: 'Shorts', to: '/shorts' },
    { icon: faPlay, text: 'Subscription', to: '/subscription' },
    { icon: faPlay, text: 'You', to: '/you' }
  ];

  return (
    <div className={`h-screen sm:h-[100%] pl-[4px] mt-[46px] bg-[#0f0f0f] fixed overflow-hidden`}>
      <div className="flex flex-col">
        {sidebarLinks.map((link, index) => (
          <div key={index} className='rounded-lg inline-block text-center cursor-pointer icon-hover'>
            <Link to={link.to} className='block my-6'>
              <FontAwesomeIcon icon={link.icon} fontSize={21} />
              <h6 className='text-xs font-thin'>{link.text}</h6>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
