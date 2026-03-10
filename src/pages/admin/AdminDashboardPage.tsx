import React from 'react';
import UploadCard from '../../features/admin/components/UploadCard';



const AdminDashboardPage: React.FC = () => {
    return (
        <div className='overflow-y-auto flex-1 bg-[#1e1e1e] text-white p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-[22px] font-bold'>Channel dashboard</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* Latest Video Performance Card */}
                <div className='bg-[#282828] border border-[#3e3e3e] rounded-lg p-5 flex flex-col gap-4 shadow-lg'>
                    <h3 className='text-sm font-bold'>Latest video performance</h3>
                    <div className='relative w-full aspect-video rounded-sm overflow-hidden bg-[#333] mb-2'>
                        <div className='absolute inset-0 flex items-center justify-center text-gray-500 italic'>No video uploaded yet</div>
                    </div>
                    <div className='space-y-3'>
                        <p className='text-xs text-[#aaaaaa]'>First 12 days 4 hours:</p>
                        <div className='flex justify-between text-sm'>
                            <span>Views</span>
                            <span className='font-medium'>0</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span>Impression click-through rate</span>
                            <span className='font-medium'>0.0%</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span>Average view duration</span>
                            <span className='font-medium'>0:00</span>
                        </div>
                    </div>
                    <button className='text-[#3ea6ff] text-xs font-bold uppercase mt-2 hover:bg-[#3ea6ff]/10 p-2 rounded self-start transition-colors'>Go to video analytics</button>
                </div>

                {/* Upload Card */}
                <div className='bg-[#282828] border border-[#3e3e3e] rounded-lg p-5 flex flex-col items-center justify-center text-center gap-4 shadow-lg min-h-[400px]'>
                    <UploadCard />
                </div>

                {/* Channel Analytics Card */}
                <div className='bg-[#282828] border border-[#3e3e3e] rounded-lg p-5 flex flex-col gap-4 shadow-lg'>
                    <h3 className='text-sm font-bold'>Channel analytics</h3>
                    <div className='py-4 border-b border-[#3e3e3e]'>
                        <p className='text-xs text-[#aaaaaa]'>Current subscribers</p>
                        <p className='text-3xl font-medium mt-1'>0</p>
                    </div>
                    <div className='space-y-4 pt-2'>
                        <h4 className='text-xs font-bold uppercase text-[#aaaaaa]'>Summary</h4>
                        <p className='text-[11px] text-[#aaaaaa]'>Last 28 days</p>
                        <div className='flex justify-between text-sm'>
                            <span>Views</span>
                            <span className='font-medium'>0 —</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span>Watch time (hours)</span>
                            <span className='font-medium'>0.0 —</span>
                        </div>
                    </div>
                    <button className='text-[#3ea6ff] text-xs font-bold uppercase mt-auto hover:bg-[#3ea6ff]/10 p-2 rounded self-start transition-colors'>Go to channel analytics</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
