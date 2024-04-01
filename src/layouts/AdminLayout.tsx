import React, { useState } from 'react';
import { UseSelector, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../adminComponents/AdminHeader';
import AdminSidebar from '../adminComponents/AdminSidebar';
import Modal from '../adminComponents/Modal';
import useGetUserData from '../adminHooks/useGetUserData';

const AdminLayout: React.FC = () => {
    const showModal = useSelector((state: RootState) => state.admin.showVideoUploadModal);



    const userData = useGetUserData(); // Assuming you have defined UserData type in useGetUserData hook

    return (
        <div className="flex flex-col h-screen">
            <AdminHeader />
            {showModal && <Modal/>}
            <div className='flex flex-1 overflow-hidden '>
                <div className='w-[70px] bg-[#282828] z-1'>
                    <AdminSidebar />
                </div>
                <div className='flex-1 flex flex-col overflow-hidden '>
                    <Outlet />  
                </div>  
            </div>
        </div>
    );
};

export default AdminLayout;
