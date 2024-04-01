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
        <div className={`h-screen overflow-hidden border-r border-[rgba(255,255,255,0.1)]`}>
            <div className="flex flex-col">
                <Link className={`rounded-lg inline-block text-center cursor-pointer`} to='/admin/dashboard'>
                    <div className='block my-6'>
                        <img className='rounded-full' src="https://yt3.googleusercontent.com/ytc/AIdro_mxeaN3bxH-5v69wJ0o6UqIKqDnukf7S6T-mNaSZA=s176-c-k-c0x00ffffff-no-rj" alt="Profile" />
                    </div>
                </Link>
                <Link className={`rounded-lg inline-block text-center cursor-pointer icon-hover ${(activeLink === 'dashboard') ? 'admin-active' : ''}`} to='/admin/dashboard' onClick={() => handleClick('dashboard')}>
                    <div className='block my-4'>
                        <FontAwesomeIcon icon={faDashboard} fontSize={21} />
                        <h6 className='text-xs font-thin'>Dashboard</h6>
                    </div>
                </Link>
                <Link className={`rounded-lg inline-block text-center cursor-pointer icon-hover ${(activeLink === 'content') ? 'admin-active' : ''}`} to='/admin/channel-details' onClick={() => handleClick('content')}>
                    <div className='block my-4'>
                        <FontAwesomeIcon icon={faCloud} fontSize={21} />
                        <h6 className='text-xs font-thin'>Content</h6>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminSidebar;
