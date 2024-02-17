import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
        <div className='w-[70px]'>
            <Sidebar/>
        </div>
        <div className="w-[100vw-70px]">{children}</div>
    </div>
  );
};

export default AdminLayout;
