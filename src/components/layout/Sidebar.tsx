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

  // ... rest of links as defined above ... (omitted for brevity in replacement but usually kept if possible)
  // I will redefine them to ensure the file is complete if I'm replacing a huge block.
  // Actually, I'll keep the logic organized.

  if (mode === 'mini') {
    return (
      <div className="h-full bg-[#0f0f0f] text-white flex flex-col items-center pt-1 overflow-y-auto no-scrollbar">
        {miniLinks.map((link, index) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={index}
              to={link.to}
              className={`w-full flex flex-col items-center justify-center py-4 px-1 hover:bg-[#272727] rounded-lg transition-colors ${isActive ? 'font-medium' : 'font-normal'}`}
            >
              <FontAwesomeIcon icon={link.icon} className={`text-[20px] mb-1.5 ${isActive ? 'text-white' : 'text-gray-100'}`} />
              <span className="text-[10px] text-gray-100 truncate w-full text-center">{link.text}</span>
            </Link>
          )
        })}
      </div>
    );
  }

  // Expanded mode content
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
    <div className="flex flex-col mb-3">
      {title && (
        <h3 className="px-6 py-2 text-base font-bold text-white flex items-center hover:bg-[#272727] rounded-lg mx-2 cursor-pointer transition-colors">
          {title} <span className="ml-2 text-xs font-light">›</span>
        </h3>
      )}
      {links.map((link, index) => {
        const isActive = location.pathname === link.to;
        return (
          <Link
            key={index}
            to={link.to}
            className={`flex items-center px-3 py-2 mx-2 rounded-lg hover:bg-[#272727] transition-colors ${isActive ? 'bg-[#272727] font-bold' : 'font-normal'}`}
          >
            <div className="w-6 mr-6 flex justify-center items-center">
              <FontAwesomeIcon icon={link.icon} className={`text-xl ${isActive ? 'text-white' : 'text-gray-100'}`} />
            </div>
            <span className="text-sm tracking-wide text-gray-100 truncate">{link.text}</span>
          </Link>
        )
      })}
    </div>
  );

  const Divider = () => <div className="my-3 border-t border-[#3f3f3f] mx-2" />;

  return (
    <div className="h-full bg-[#0f0f0f] text-white overflow-y-auto custom-scrollbar pb-8 pt-1 pr-2">
      {renderSection(mainLinks)}
      <Divider />
      {renderSection(userLinks, 'You')}
      <Divider />
      <div className="px-6 py-2 text-sm font-medium text-white mb-2 ml-2">Subscriptions</div>
      <div className="px-6 py-2 text-xs text-[#aaaaaa] ml-2">Sign in to see channels you've subscribed to.</div>
      <Divider />
      <div className="px-5 py-2 text-base font-bold text-white ml-2">Explore</div>
      {renderSection(exploreLinks)}
      <Divider />
      {renderSection(settingsLinks)}
      <Divider />
      <div className="px-6 py-2 text-[12px] font-bold text-[#aaaaaa] flex flex-wrap gap-x-2 leading-tight ml-2">
        <span>About</span><span>Press</span><span>Copyright</span><br />
        <span>Contact us</span><span>Creator</span><br />
        <span>Advertise</span><span>Developers</span>
      </div>
      <div className="px-6 py-4 text-[12px] font-bold text-[#aaaaaa] flex flex-wrap gap-x-2 leading-tight ml-2">
        <span>Terms</span><span>Privacy</span><span>Policy & Safety</span><br />
        <span>How YouTube works</span><br />
        <span>Test new features</span>
      </div>
      <div className="px-6 py-2 text-[12px] text-[#717171] ml-2">
        © 2024 Google LLC
      </div>
    </div>
  );
};

export default Sidebar;
