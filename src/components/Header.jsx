import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faMicrophone, faVideoCamera, faBell, faUser } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
    return(
        <div className="flex justify-between mx-5 py-2">
            <div className="flex justify-between w-[166px]   items-center">
                <div className="rounded-full h-9 w-9 flex justify-center items-center icon-hover">
                    <FontAwesomeIcon icon={faBars} fontSize={20}/>
                </div>
                <div className="flex items-center text-lg">
                    <FontAwesomeIcon icon={faYoutube} fontSize={26} color="red" />&nbsp;&nbsp;<span className="text-xl">Youtube</span>
                </div>
            </div>
            <div className="w-1/2  flex items-center justify-around">
                <div className="">
                    {/* <FontAwesomeIcon icon={faSearch} /> */}
                </div>
                <div className="">
                    <input type="text" className="rounded-l-full w-96 py-2 pl-4 outline-none border searchbar-bg"/>
                    <button className="youtube-search-button text-center py-2 px-5 border border-l-0  border-color rounded-r-full">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className="icons-bg w-11 h-11  cursor-pointer flex justify-center items-center rounded-full">
                    <FontAwesomeIcon icon={faMicrophone} />
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

export default Header;
