import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, toggleSidebar } from "../../../features/admin/store/adminSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faMicrophone, faVideo, faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../app/store";


const Header: React.FC = () => {

    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLoginClick = () => {
        dispatch(openLoginModal());
    };

    const handleToggle = () => {
        dispatch(toggleSidebar());
    };

    return (
        <div className="sticky top-0 left-0 right-0 z-[100] bg-[#0f0f0f] px-4 h-[56px] flex items-center justify-between">
            {/* Left Section: Menu + Logo */}
            <div className="flex items-center">
                <div
                    className="p-2 mr-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] cursor-pointer active:bg-[rgba(255,255,255,0.2)] transition-colors"
                    onClick={handleToggle}
                >
                    <FontAwesomeIcon icon={faBars} className="text-white text-xl" />
                </div>
                <div className="flex items-center cursor-pointer select-none">
                    <div className="relative flex items-center">
                        <div className="relative flex items-center justify-center">
                            {/* This white background makes the FontAwesome cutout triangle appear white */}
                            <div className="absolute w-3 h-3 bg-white"></div>
                            <FontAwesomeIcon icon={faYoutube} className="text-[#ff0000] text-[32px] relative z-10" />
                        </div>
                        <span className="text-white text-[20px] font-sans font-bold tracking-[-0.05em] ml-1.5 antialiased">YouTube</span>
                        <span className="text-[10px] text-gray-400 absolute -top-1 -right-4 font-normal">IN</span>
                    </div>
                </div>
            </div>

            {/* Center Section: Search Bar */}
            <div className="hidden sm:flex items-center flex-1 max-w-[720px] ml-10">
                <div className="flex flex-1 items-center">
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-[#121212] border border-[#303030] text-white px-4 py-2 rounded-l-full focus:border-[#1c62b9] outline-none shadow-inner"
                        />
                        <button className="bg-[#222222] border border-l-0 border-[#303030] px-6 py-2 rounded-r-full hover:bg-[#303030] cursor-pointer">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                        </button>
                    </div>
                </div>
                <div className="ml-4 w-10 h-10 bg-[#181818] rounded-full flex items-center justify-center hover:bg-[#303030] cursor-pointer transition-colors">
                    <FontAwesomeIcon icon={faMicrophone} className="text-white" />
                </div>
            </div>

            {/* Right Section: Icons + User */}
            <div className="flex items-center space-x-2 sm:space-x-5">
                <div className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full cursor-pointer hidden sm:block">
                    <FontAwesomeIcon icon={faVideo} className="text-white text-lg" />
                </div>
                <div className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full cursor-pointer">
                    <FontAwesomeIcon icon={faBell} className="text-white text-lg" />
                </div>

                {
                    !isAuthenticated ? (
                        <div
                            className="flex items-center border border-[#3ea6ff] text-[#3ea6ff] px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#263850] transition-colors"
                            onClick={handleLoginClick}
                        >
                            <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-xl" />
                            <span className="font-medium text-sm">Sign in</span>
                        </div>
                    ) : (
                        <div className="ml-2 cursor-pointer w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm">
                            S
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Header;
