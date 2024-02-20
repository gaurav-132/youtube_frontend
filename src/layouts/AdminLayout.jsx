import React from 'react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import Card from '../components/UploadCard';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <AdminHeader/>
            <div className='flex flex-1 overflow-hidden '>
                <div className='w-[70px] bg-[#282828] z-1'>
                    <Sidebar/>
                </div>
                <div className='flex-1 flex flex-col overflow-hidden'>
                    <div className='overflow-y-auto items-center flex-1 bg-[#1f1f1f]'>
                        <div className='pl-5 pt-5 text-xl'>Channel Dashboard</div>
                        <div className='flex items-center pl-5 h-full flex-grow'>
                            <Card/> 
                        </div>
                        {/* <Home backendUrl={BACKEND_URL} headerObj={HEADER_OBJ} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
