import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from 'react-router-dom';

function Navbar(){
    const[sidebar, setSidebar]=useState(false)

    const showSidebar= () => setSidebar(!sidebar)

    return(
        <div>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className= 'nav-menu-items'> 
                <li className="navbar-toggle">
                    <Link to="#" className='menu-bars'>
                        <AiIcons.AiOutlineClose />
                    </Link>
                </li>
            </ul>
        </nav>

        </div>
    )
}

export default Navbar