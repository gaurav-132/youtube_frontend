import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header/Header';
import SuggestionCarousel from '../features/video/components/SuggestionCarousel';
import { BACKEND_URL, HEADER_OBJ } from '../utils/constant';

import Home from '../pages/Home';
import LoginModal from '../features/auth/components/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { toggleSidebar } from '../features/admin/store/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

interface ModalData {
    title: string;
}

const NormalLayout: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [carauselItem, setCarauselItem] = useState<any[]>([]);
    const showLoginModal = useSelector((state: RootState) => state.admin.showLoginModal);
    const isSidebarOpen = useSelector((state: RootState) => state.admin.isSidebarOpen);

    const URL = `${BACKEND_URL}/api/v1/youtube/get-carausel-data`;

    const getCarauselItems = async () => {
        try {
            const response = await fetch(URL, HEADER_OBJ);
            const items = await response.json();
            setCarauselItem(items.carauselData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCarauselItems();
    }, []);

    const getScreenType = (): string => {
        return location.pathname.includes('/video') ? 'video' : 'home';
    };

    const isHome = getScreenType() === 'home';

    const modalData: ModalData = {
        title: "Login"
    };

    return (
        <div className="bg-[#0f0f0f] min-h-screen flex flex-col relative overflow-x-hidden">
            <Header />
            {showLoginModal && <LoginModal />}

            <div className="flex flex-1 pt-[56px]">
                {/* --- Sidebar Controller --- */}

                {/* 1. Overlay Sidebar (ONLY for Video page or non-home routes) */}
                {!isHome && (
                    <>
                        {/* Overlay backdrop */}
                        {isSidebarOpen && (
                            <div
                                className="fixed inset-0 bg-black/50 z-[140] transition-opacity duration-300"
                                onClick={() => dispatch(toggleSidebar())}
                            />
                        )}
                        {/* The expanded sidebar that slides in */}
                        <div className={`fixed top-0 left-0 h-screen w-[240px] bg-[#0f0f0f] z-[150] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                            <div className="h-[56px] flex items-center px-4">
                                <div className="p-2 mr-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] cursor-pointer" onClick={() => dispatch(toggleSidebar())}>
                                    <FontAwesomeIcon icon={faBars} className="text-white text-xl" />
                                </div>
                                <div className="flex items-center cursor-pointer select-none">
                                    <div className="relative flex items-center justify-center">
                                        <div className="absolute w-3 h-3 bg-white"></div>
                                        <FontAwesomeIcon icon={faYoutube} className="text-[#ff0000] text-[32px] relative z-10" />
                                    </div>
                                    <span className="text-white text-[20px] font-sans font-bold tracking-[-0.05em] ml-1.5 antialiased">YouTube</span>
                                </div>
                            </div>
                            <div className="h-[calc(100vh-56px)] overflow-y-auto custom-scrollbar">
                                <Sidebar mode="expanded" />
                            </div>
                        </div>
                    </>
                )}

                {/* 2. Persistent Sidebar (ONLY for Home page) */}
                {isHome && (
                    <div className={`flex-shrink-0 transition-all duration-300 hidden lg:block sticky top-[56px] h-[calc(100vh-56px)] overflow-y-auto custom-scrollbar border-r border-transparent hover:border-[#3f3f3f]/10 ${isSidebarOpen ? 'w-[240px]' : 'w-[72px]'}`}>
                        <Sidebar mode={isSidebarOpen ? 'expanded' : 'mini'} />
                    </div>
                )}

                {/* --- Main Content Area --- */}
                <main className="flex-1 min-w-0 flex flex-col">
                    {isHome && (
                        <div className="sticky top-[56px] z-20 bg-[#0f0f0f]">
                            <div className="mx-auto">
                                <SuggestionCarousel carauselItems={carauselItem} />
                            </div>
                        </div>
                    )}
                    <div className={`${isHome ? 'px-4' : ''} flex-1`}>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NormalLayout;
