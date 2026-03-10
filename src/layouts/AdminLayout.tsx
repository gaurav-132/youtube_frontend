import React, { useState } from 'react';
import { UseSelector, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../features/admin/components/AdminHeader';
import AdminSidebar from '../features/admin/components/AdminSidebar';
import Modal from '../features/admin/components/Modal';
import useGetUserData from '../features/admin/hooks/useGetUserData';

const AdminLayout: React.FC = () => {
    const showModal = useSelector((state: RootState) => state.admin.showVideoUploadModal);



    const userData = useGetUserData(); // Assuming you have defined UserData type in useGetUserData hook

    return (
        <div className="flex flex-col h-screen">
            <AdminHeader />
            {showModal && <Modal />}
            <div className='flex flex-1 overflow-hidden '>
                <div className='w-[250px] bg-[#1e1e1e] border-r border-[#3e3e3e] hidden md:block'>
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
