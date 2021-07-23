import React from 'react';
import { Link } from 'react-router-dom'
import { IoHomeSharp } from 'react-icons/io5';
import { FaTasks } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { RiZzzFill } from 'react-icons/ri';
import { GiTwoCoins  } from 'react-icons/gi';
import { MdNotInterested  } from 'react-icons/md';


const Navigation = () => { 
 return (
     <nav>
         <Link to="/" >
            < IoHomeSharp className="icon"/>
         </Link>
         <Link to="/calender">
             < FaRegCalendarAlt className="icon"/> 
         </Link>
         <Link to="/todo">
            <div className="not_in_use_container">
               <MdNotInterested className="not_in_use" />
               < FaTasks className="icon"/>
            </div>
         </Link>
         <Link to="/" >
            <div className="not_in_use_container">
               <MdNotInterested className="not_in_use" />
               <GiTwoCoins className="icon" />
            </div>
         </Link>
         <Link to="/settings" >
            < FiSettings className="icon"/>
         </Link>        
        
     </nav>
 )
}

export default Navigation;