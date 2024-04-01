import React from 'react';
import UploadCard from '../adminComponents/UploadCard';



const AdminDashboardPage: React.FC = () => {
    return (
        <div className='overflow-y-auto items-center flex-1 bg-[#1f1f1f]'>
            <div className='pl-5 pt-5 text-xl'>Channel Dashboard</div>
            <div className='flex items-center pl-5 h-full flex-grow'>
                <UploadCard/>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
