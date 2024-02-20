import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faMicrophone, faVideoCamera, faBell, faUser } from "@fortawesome/free-solid-svg-icons";


const AdminHeader = () => {
    return(
        <div className="flex justify-between px-5 py-3 shadow-md sticky top-0 bg-[#282828] admin-shadow text-white p-4 z-[2]">
            <div className="flex justify-between w-[166px] items-center">
                <div className="rounded-full h-9 w-9 flex justify-center items-center icon-hover">
                    <FontAwesomeIcon icon={faBars} fontSize={20}/>
                </div>
                <div className="flex items-center text-lg">
                    <img src="https://www.gstatic.com/youtube/img/creator/yt_studio_logo_white.svg" className="w-24" alt="" />
                </div>
            </div>
            <div className="w-1/2  flex items-center justify-around">
                <div className="">
                    {/* <FontAwesomeIcon icon={faSearch} /> */}
                </div>
                <div className="relative">
                    <input type="text" className="rounded-md w-[35vw] py-[6px] pl-10 outline-none text-sm bg-[#282828]  border-[#606060] border" placeholder="Search Your Channel"/>
                    <FontAwesomeIcon icon={faSearch} className="absolute top-[10px] left-3 text-sm"/>
                </div>
            </div>
            <div className="w-1/6  flex items-center justify-end">
                <div className=" text-lg cursor-pointer">
                    <FontAwesomeIcon icon={faVideoCamera}/>
                </div>
                <div className="ml-6 text-lg cursor-pointer">
                    <FontAwesomeIcon icon={faBell}/>
                </div>
                <div className="ml-6 text-lg cursor-pointer">
                    <FontAwesomeIcon icon={faUser}/>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;
