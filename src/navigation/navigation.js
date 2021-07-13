import React from 'react';
import { Link } from 'react-router-dom'
import { IoHomeSharp } from 'react-icons/io5';
import { FaTasks } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { RiZzzFill } from 'react-icons/ri';
import { GiTwoCoins  } from 'react-icons/gi';


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
            < FaTasks className="icon"/>
         </Link>
         <Link to="/sleep-tracker">
            < RiZzzFill className="icon"/>
         </Link>
         <Link to="/" >
            <GiTwoCoins className="icon" />
         </Link>
         <Link to="/settings" >
            < FiSettings className="icon"/>
         </Link>        
        
     </nav>
 )
}

export default Navigation;