import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, toggleSidebar } from "../../../features/admin/store/adminSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faMicrophone, faVideo, faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../app/store";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLoginClick = () => dispatch(openLoginModal());
    const handleToggle = () => dispatch(toggleSidebar());

    return (
        <header className="fixed top-0 left-0 right-0 z-[160] h-[56px] bg-[#0f0f0f] px-2 sm:px-4 flex items-center justify-between">
            <div className="flex items-center min-w-[120px]">
                <button
                    className="p-2 mr-1 sm:mr-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.2)] transition-colors"
                    onClick={handleToggle}
                    aria-label="Open menu"
                >
                    <FontAwesomeIcon icon={faBars} className="text-white text-lg" />
                </button>
                <div className="flex items-center cursor-pointer select-none">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-3 h-3 bg-white" />
                        <FontAwesomeIcon icon={faYoutube} className="text-[#ff0000] text-[30px] relative z-10" />
                    </div>
                    <span className="text-white text-[18px] sm:text-[20px] font-bold tracking-[-0.05em] ml-1.5">YouTube</span>
                    <span className="text-[10px] text-gray-400 ml-1 hidden sm:inline">IN</span>
                </div>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-[720px] mx-4 lg:mx-10">
                <div className="flex w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#121212] border border-[#303030] text-white px-4 h-10 rounded-l-full focus:border-[#1c62b9] outline-none"
                    />
                    <button className="bg-[#222222] border border-l-0 border-[#303030] px-6 h-10 rounded-r-full hover:bg-[#303030]">
                        <FontAwesomeIcon icon={faSearch} className="text-gray-300" />
                    </button>
                </div>
                <button className="ml-3 w-10 h-10 bg-[#181818] rounded-full flex items-center justify-center hover:bg-[#303030] transition-colors">
                    <FontAwesomeIcon icon={faMicrophone} className="text-white" />
                </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-3">
                <button className="md:hidden p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)]">
                    <FontAwesomeIcon icon={faSearch} className="text-white text-base" />
                </button>
                <button className="hidden sm:inline-flex p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full">
                    <FontAwesomeIcon icon={faVideo} className="text-white text-lg" />
                </button>
                <button className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full">
                    <FontAwesomeIcon icon={faBell} className="text-white text-lg" />
                </button>

                {!isAuthenticated ? (
                    <button
                        className="flex items-center border border-[#3ea6ff] text-[#3ea6ff] px-2 sm:px-3 py-1.5 rounded-full hover:bg-[#263850] transition-colors"
                        onClick={handleLoginClick}
                    >
                        <FontAwesomeIcon icon={faUserCircle} className="sm:mr-2 text-lg sm:text-xl" />
                        <span className="font-medium text-sm hidden sm:inline">Sign in</span>
                    </button>
                ) : (
                    <div className="ml-1 cursor-pointer w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm">S</div>
                )}
            </div>
        </header>
    );
};

export default Header;
