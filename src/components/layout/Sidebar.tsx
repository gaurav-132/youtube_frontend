import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faCompass, faPlayCircle, faUser,
  faClock, faVideo, faThumbsUp, faHistory,
  faFire, faBagShopping, faMusic, faFilm,
  faTowerBroadcast, faGamepad, faNewspaper,
  faTrophy, faLightbulb, faShirt, faPodcast,
  faGear, faFlag, faCircleQuestion, faMessage
} from '@fortawesome/free-solid-svg-icons';
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
  ];

  const miniLinks: SidebarLink[] = [
    { icon: faHome, text: 'Home', to: '/' },
    { icon: faCompass, text: 'Shorts', to: '/shorts' },
    { icon: faPlayCircle, text: 'Subscriptions', to: '/subscription' },
    { icon: faUser, text: 'You', to: '/history' },
  ];

  if (mode === 'mini') {
    return (
      <div className="h-full bg-[#0f0f0f] text-white flex flex-col items-center pt-1 overflow-y-auto no-scrollbar">
        {miniLinks.map((link, index) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={index}
              to={link.to}
              className={`w-full flex flex-col items-center justify-center py-4 px-1 hover:bg-[#272727] transition-colors ${isActive ? 'font-medium' : 'font-normal'}`}
            >
              <FontAwesomeIcon icon={link.icon} className={`text-[19px] mb-1.5 ${isActive ? 'text-white' : 'text-gray-100'}`} />
              <span className="text-[10px] text-gray-100 truncate w-full text-center">{link.text}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  const userLinks: SidebarLink[] = [
    { icon: faHistory, text: 'History', to: '/history' },
    { icon: faVideo, text: 'Your videos', to: '/your-videos' },
    { icon: faClock, text: 'Watch later', to: '/playlist?list=WL' },
    { icon: faThumbsUp, text: 'Liked videos', to: '/playlist?list=LL' },
  ];

  const exploreLinks: SidebarLink[] = [
    { icon: faFire, text: 'Trending', to: '/trending' },
    { icon: faBagShopping, text: 'Shopping', to: '/shopping' },
    { icon: faMusic, text: 'Music', to: '/music' },
    { icon: faFilm, text: 'Movies', to: '/movies' },
    { icon: faTowerBroadcast, text: 'Live', to: '/live' },
    { icon: faGamepad, text: 'Gaming', to: '/gaming' },
    { icon: faNewspaper, text: 'News', to: '/news' },
    { icon: faTrophy, text: 'Sports', to: '/sports' },
    { icon: faLightbulb, text: 'Courses', to: '/courses' },
    { icon: faShirt, text: 'Fashion & Beauty', to: '/fashion' },
    { icon: faPodcast, text: 'Podcasts', to: '/podcasts' },
  ];

  const settingsLinks: SidebarLink[] = [
    { icon: faGear, text: 'Settings', to: '/settings' },
    { icon: faFlag, text: 'Report history', to: '/report' },
    { icon: faCircleQuestion, text: 'Help', to: '/help' },
    { icon: faMessage, text: 'Send feedback', to: '/feedback' },
  ];

  const renderSection = (links: SidebarLink[], title?: string) => (
    <div className="flex flex-col mb-2">
      {title && <h3 className="px-6 py-2 text-base font-bold text-white">{title}</h3>}
      {links.map((link, index) => {
        const isActive = location.pathname === link.to;
        return (
          <Link
            key={index}
            to={link.to}
            className={`flex items-center px-3 py-2 mx-3 rounded-xl hover:bg-[#272727] transition-colors ${isActive ? 'bg-[#272727] font-semibold' : 'font-normal'}`}
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

  const Divider = () => <div className="my-2 border-t border-[#303030] mx-3" />;

  return (
    <div className="h-full bg-[#0f0f0f] text-white overflow-y-auto custom-scrollbar pb-6 pt-1 pr-1">
      {renderSection(mainLinks)}
      <Divider />
      {renderSection(userLinks, 'You')}
      <Divider />
      <div className="px-6 py-2 text-sm font-medium text-white">Subscriptions</div>
      <div className="px-6 py-2 text-xs text-[#aaaaaa]">Sign in to see channels you've subscribed to.</div>
      <Divider />
      <div className="px-6 py-2 text-base font-bold text-white">Explore</div>
      {renderSection(exploreLinks)}
      <Divider />
      {renderSection(settingsLinks)}
    </div>
  );
};

export default Sidebar;
