import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header/Header';
import SuggestionCarousel from '../features/video/components/SuggestionCarousel';
import { BACKEND_URL, HEADER_OBJ } from '../utils/constant';
import LoginModal from '../features/auth/components/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { toggleSidebar } from '../features/admin/store/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const NormalLayout: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [carauselItem, setCarauselItem] = useState<any[]>([]);
    const showLoginModal = useSelector((state: RootState) => state.admin.showLoginModal);
    const isSidebarOpen = useSelector((state: RootState) => state.admin.isSidebarOpen);

    useEffect(() => {
        const getCarauselItems = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/v1/youtube/get-carausel-data`, HEADER_OBJ);
                const items = await response.json();
                setCarauselItem(items.carauselData || []);
            } catch (error) {
                console.log(error);
            }
        };

        getCarauselItems();
    }, []);

    const isHome = !location.pathname.includes('/video');

    return (
        <div className="bg-[#0f0f0f] min-h-screen overflow-x-hidden">
            <Header />
            {showLoginModal && <LoginModal />}

            <div className="pt-[56px] flex">
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-[140] lg:hidden"
                        onClick={() => dispatch(toggleSidebar())}
                    />
                )}

                <aside className={`fixed top-0 left-0 h-screen w-[240px] bg-[#0f0f0f] z-[150] transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
                    <div className="h-[56px] flex items-center px-4">
                        <button
                            className="p-2 mr-2 rounded-full hover:bg-[rgba(255,255,255,0.1)]"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <FontAwesomeIcon icon={faBars} className="text-white text-lg" />
                        </button>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faYoutube} className="text-[#ff0000] text-[28px]" />
                            <span className="text-white text-[19px] font-bold tracking-[-0.05em] ml-1.5">YouTube</span>
                        </div>
                    </div>
                    <div className="h-[calc(100vh-56px)] overflow-y-auto custom-scrollbar">
                        <Sidebar mode="expanded" />
                    </div>
                </aside>

                {isHome && (
                    <aside className={`hidden lg:block shrink-0 h-[calc(100vh-56px)] sticky top-[56px] overflow-y-auto ${isSidebarOpen ? 'w-[240px]' : 'w-[72px]'}`}>
                        <Sidebar mode={isSidebarOpen ? 'expanded' : 'mini'} />
                    </aside>
                )}

                <main className="flex-1 min-w-0">
                    {isHome && (
                        <div className="sticky top-[56px] z-20 bg-[#0f0f0f]">
                            <SuggestionCarousel carauselItems={carauselItem} />
                        </div>
                    )}
                    <div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NormalLayout;
