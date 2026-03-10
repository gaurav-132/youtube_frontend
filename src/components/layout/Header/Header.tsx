import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../features/admin/store/adminSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBars, faBell, faMicrophone, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <header className="fixed top-0 left-0 right-0 z-[160] h-[56px] bg-[#0f0f0f] px-4 flex items-center justify-between">
            <div className="flex items-center min-w-[170px]">
                <button
                    className="p-2 mr-3 rounded-full hover:bg-[#272727] transition-colors"
                    onClick={() => dispatch(toggleSidebar())}
                    aria-label="Open menu"
                >
                    <FontAwesomeIcon icon={faBars} className="text-white text-lg" />
                </button>
                <Link to="/" className="flex items-start cursor-pointer select-none" aria-label="Go to home">
                    <FontAwesomeIcon icon={faYoutube} className="text-[#ff0000] text-[30px] mt-[1px]" />
                    <span className="text-white text-[29px] leading-none font-semibold tracking-[-0.065em] ml-1">YouTube</span>
                    <span className="text-[10px] text-[#aaaaaa] mt-[2px] ml-1 hidden sm:inline">IN</span>
                </Link>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-[728px] ml-8 mr-5">
                <div className="flex w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#121212] border border-[#303030] text-white text-[16px] px-4 h-10 rounded-l-full focus:border-[#1c62b9] outline-none"
                    />
                    <button className="bg-[#222222] border border-l-0 border-[#303030] px-6 h-10 rounded-r-full hover:bg-[#303030]">
                        <FontAwesomeIcon icon={faSearch} className="text-gray-300 text-[18px]" />
                    </button>
                </div>
                <button className="ml-3 w-10 h-10 bg-[#181818] rounded-full flex items-center justify-center hover:bg-[#303030] transition-colors">
                    <FontAwesomeIcon icon={faMicrophone} className="text-white" />
                </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <button className="md:hidden p-2 rounded-full hover:bg-[#272727]">
                    <FontAwesomeIcon icon={faSearch} className="text-white text-base" />
                </button>

                <button className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-[#272727] hover:bg-[#3a3a3a] text-white font-semibold text-[15px] leading-none">
                    <FontAwesomeIcon icon={faPlus} className="text-base" />
                    <span className="text-[15px]">Create</span>
                </button>

                <button className="relative p-2 rounded-full hover:bg-[#272727]">
                    <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-[#cc0000] text-white px-1.5 py-[1px] rounded-full leading-none font-semibold">9+</span>
                    <FontAwesomeIcon icon={faBell} className="text-white text-lg" />
                </button>

                <div className="ml-1 cursor-pointer w-8 h-8 rounded-full bg-[#00796b] flex items-center justify-center text-white text-sm font-semibold">G</div>
            </div>
        </header>
    );
};

export default Header;
