import { faHome, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
 
const Sidebar = ({isWide}) => {
  return (
    <div className={` h-screen  overflow-hidden  `}>
        <div className="flex flex-col">
            <div className='rounded-lg inline-block text-center cursor-pointer icon-hover'>
                <Link className='block my-6'>
                    <FontAwesomeIcon icon={faHome} fontSize={21}/>
                    <h6 className='text-xs font-thin'>Home</h6>
                </Link>
            </div>
            <div className='rounded-lg inline-block text-center cursor-pointer icon-hover'>
                <Link className='block my-6'>
                    <FontAwesomeIcon icon={faPlay} fontSize={21}/>
                    <h6 className='text-xs font-thin'>Shorts</h6>
                </Link>
            </div>
            <div className='rounded-lg inline-block text-center cursor-pointer icon-hover'>
                <Link className='block my-6'>
                    <FontAwesomeIcon icon={faPlay} fontSize={21}/>
                    <h6 className='text-xs font-thin'>Subscription</h6>
                </Link>
            </div>
            <div className='rounded-lg inline-block text-center cursor-pointer icon-hover'>
                <Link className='block my-6'>
                    <FontAwesomeIcon icon={faPlay} fontSize={21}/>
                    <h6 className='text-xs font-thin'>You</h6>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar