import React, { useEffect, useState } from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SuggestionCarausel from '../components/SuggestionCarausel';
import { BACKEND_URL } from '/src/constant.jsx';
import Home from '../pages/Home';


const NormalLayout = () => {

    const location = useLocation();

    const [carauselItem, setCarauselItem] = useState([]);

    const URL = BACKEND_URL+'/api/youtube/get-carausel-data';

    const HEADER_OBJ = {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                },
        body: JSON.stringify({
        })
    }

    const getCarauselItems = async () => {
        try{
            const response = await fetch(URL, HEADER_OBJ);
            // console.log(response);
            const items = await response.json();
            setCarauselItem(items.carauselData);
            console.log(carauselItem);
            // console.log(items)
            // console.log(items);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getCarauselItems();
    }, []);


    const getScreenType = () => {
        if (location.pathname === '/videos') { 
          return 'video';
        } else {
          return 'home';
        }
    };

    return (
        <div className="normal-layout h-screen flex flex-col">
            <Header />
            {
                getScreenType() === 'home' ? (
                    <div className="flex flex-1 overflow-hidden">
                        <div className='w-[70px]'>
                            <Sidebar/>
                        </div>
                        <div className='flex-1 flex flex-col overflow-hidden'>
                            <div className='py-3'>
                                <SuggestionCarausel carauselItems={carauselItem}/>
                            </div>
                            <div className='overflow-y-auto flex-1'>
                                <Home backendUrl={BACKEND_URL} headerObj={HEADER_OBJ} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="video-screen">
                    sdf
                    </div>
                )
            }
        
        </div>
    );
};

export default NormalLayout;
