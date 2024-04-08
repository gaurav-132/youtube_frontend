import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header/Header';
import SuggestionCarausel from '../components/SuggestionCarausel';
import { BACKEND_URL, HEADER_OBJ } from '../utils/constant';

import Home from '../pages/Home';
import LoginModal from '../components/LoginModal';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface ModalData {
    title: string;
}

const NormalLayout: React.FC = () => {
    const location = useLocation();
    const [carauselItem, setCarauselItem] = useState<any[]>([]);
    const showLoginModal = useSelector((state: RootState) => state.admin.showLoginModal);



    const URL = `${BACKEND_URL}/api/youtube/get-carausel-data`;

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

    const getScreenType = (): string => { // Specify the return type for getScreenType function
        if (location.pathname === '/videos') {
            return 'video';
        } else {
            return 'home';
        }
    };

    const modalData: ModalData = {
        title: "Login"
    };

    return (
        <div className="normal-layout h-screen flex flex-col">
            <Header/>
            {showLoginModal  && <LoginModal/>}
            {getScreenType() === 'home' ? (
                <div className="flex flex-1">
                    <div className='w-[70px] h-[80vh]'>
                        <Sidebar />
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <div className='py-3 mt-[60px]'>
                            <SuggestionCarausel carauselItems={carauselItem} />
                        </div>
                        <div className='flex-1'>
                            <Home/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="video-screen">
                    sdf
                </div>
            )}
        </div>
    );
};

export default NormalLayout;
