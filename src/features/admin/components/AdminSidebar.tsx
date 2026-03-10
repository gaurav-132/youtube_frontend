import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faCloud, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminSidebar: React.FC = () => {
    const [activeLink, setActiveLink] = useState<string>('dashboard');

    const handleClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className={`h-full bg-[#1e1e1e] overflow-y-auto custom-scrollbar border-r border-[#3e3e3e]`}>
            <div className="flex flex-col pt-4 px-3">
                <div className="mb-6 flex flex-col items-center">
                    <img className='rounded-full h-24 w-24 object-cover mb-2 border-2 border-[#3e3e3e]' src="https://yt3.googleusercontent.com/ytc/AIdro_mxeaN3bxH-5v69wJ0o6UqIKqDnukf7S6T-mNaSZA=s176-c-k-c0x00ffffff-no-rj" alt="Profile" />
                    <h5 className="text-sm font-medium text-gray-200">Your Channel</h5>
                    <p className="text-xs text-gray-400">Admin</p>
                </div>

                <div className="space-y-1">
                    <Link
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${activeLink === 'dashboard' ? 'bg-[#cc0000] text-white' : 'text-gray-300 hover:bg-[#3e3e3e]'}`}
                        to='/admin/dashboard'
                        onClick={() => handleClick('dashboard')}
                    >
                        <FontAwesomeIcon icon={faDashboard} className="mr-4 text-lg w-6" />
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>

                    <Link
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${activeLink === 'content' ? 'bg-[#cc0000] text-white' : 'text-gray-300 hover:bg-[#3e3e3e]'}`}
                        to='/admin/channel-details'
                        onClick={() => handleClick('content')}
                    >
                        <FontAwesomeIcon icon={faCloud} className="mr-4 text-lg w-6" />
                        <span className="text-sm font-medium">Content</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
