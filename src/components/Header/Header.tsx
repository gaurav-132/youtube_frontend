import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../../features/adminSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faMicrophone, faVideoCamera, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../app/store";


const Header: React.FC = () => {

    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    
    const handleClick = () => {
        dispatch(openLoginModal());
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-10 bg-[#0f0f0f] px-5 py-2 text-white">
            <div className="flex justify-between w-full max-w-screen-xl mx-auto items-center">
                <div className="flex justify-between w-[166px] sm:w-[150px] items-center">
                    <div className="rounded-full h-9 w-9 flex justify-center items-center icon-hover">
                        <FontAwesomeIcon icon={faBars} fontSize={20}/>
                    </div>
                    <div className="flex items-center text-lg">
                        <FontAwesomeIcon icon={faYoutube} fontSize={26} color="red" />&nbsp;&nbsp;<span className="text-xl">Youtube</span>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-around">
                    <div className="">
                        {/* <FontAwesomeIcon icon={faSearch} /> */}
                    </div>
                    <div className="">
                        <input type="text" className="rounded-l-full w-96 md:w-80 sm:w-40 py-2 pl-4 outline-none border searchbar-bg"/>
                        <button className="youtube-search-button text-center py-2 px-5 border border-l-0 border-color rounded-r-full">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="icons-bg w-11 h-11 cursor-pointer flex justify-center items-center rounded-full">
                        <FontAwesomeIcon icon={faMicrophone} />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="ml-6 text-lg cursor-pointer">
                        <FontAwesomeIcon icon={faVideoCamera}/>
                    </div>
                    <div className="ml-6 text-lg cursor-pointer">
                        <FontAwesomeIcon icon={faBell}/>
                    </div>
                    {
                        !isAuthenticated &&
                            <div className="ml-6 text-lg cursor-pointer">
                                <FontAwesomeIcon icon={faUser} onClick={handleClick}/>
                            </div>
                    }
                    {
                        isAuthenticated && 
                            <div className="ml-6 text-lg cursor-pointer">
                                {/* <FontAwesomeIcon icon={faUser} onClick={handleClick}/> */}
                                Logout
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
