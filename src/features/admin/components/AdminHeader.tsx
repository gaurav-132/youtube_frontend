import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faMicrophone, faVideoCamera, faBell, faUser } from "@fortawesome/free-solid-svg-icons";



const AdminHeader: React.FC = () => {
    return (
        <div className="flex justify-between items-center px-4 h-[56px] shadow-sm sticky top-0 bg-[#1e1e1e] border-b border-[#3e3e3e] z-20 text-white">
            <div className="flex items-center">
                <div className="p-2 mr-4 rounded-full hover:bg-[#3e3e3e] cursor-pointer">
                    <FontAwesomeIcon icon={faBars} className="text-xl" />
                </div>
                <div className="flex items-center">
                    <img src="https://www.gstatic.com/youtube/img/creator/yt_studio_logo_white.svg" className="h-6" alt="YouTube Studio" />
                </div>
            </div>

            <div className="flex-1 max-w-[600px] mx-8 relative hidden md:block">
                <input
                    type="text"
                    className="w-full bg-[#121212] border border-[#3e3e3e] text-gray-300 text-sm rounded-lg py-2 pl-10 pr-4 focus:border-[#3ea6ff] outline-none transition-colors"
                    placeholder="Search across your channel"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            </div>

            <div className="flex items-center space-x-4">
                <div className="p-2 hover:bg-[#3e3e3e] rounded-full cursor-pointer text-gray-300 hover:text-white transition-colors">
                    <FontAwesomeIcon icon={faVideoCamera} className="text-lg" />
                </div>
                <div className="p-2 hover:bg-[#3e3e3e] rounded-full cursor-pointer text-gray-300 hover:text-white transition-colors">
                    <FontAwesomeIcon icon={faBell} className="text-lg" />
                </div>
                <div className="cursor-pointer">
                    <img className='rounded-full h-8 w-8 object-cover border border-[#3e3e3e]' src="https://yt3.googleusercontent.com/ytc/AIdro_mxeaN3bxH-5v69wJ0o6UqIKqDnukf7S6T-mNaSZA=s176-c-k-c0x00ffffff-no-rj" alt="Profile" />
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;
