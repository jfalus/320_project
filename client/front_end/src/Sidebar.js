import React from 'react'
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className= "sidebar">

            <li>
                <Link to="/create-item"><button type="button">Create Item</button></Link>
            </li>

            <li>
            <h2><b>Categories</b></h2>
            <br></br><br></br>
                
            <body2>
                <a href="#" class="notification">
                    <span>PTO Requests</span>
                    <span class="badge">3</span>
                </a><br></br><br></br>

                <a href="#" class="notification">
                    <span>Performance Reviews</span>
                    <span class="badge">1</span>
                </a><br></br><br></br>

                <a href="#" class="notification">
                    <span>Trainings</span>
                    <span class="badge">4</span>
                </a><br></br>
            </body2>

            </li>
        
            <li>
                    <div class="dropdown">
                    <button class="dropbtn">
                            
                        Filters <i class="fa fa-caret-down" aria-hidden="true"></i></button>  
                           
                    <div class="dropdown-content">
                    <a target="_blank" href="">TODO</a>
                    <a target="_blank" href="">IN PROGRESS</a>
                    <a target="_blank" href="">COMPLETED</a>

                    </div>
                    </div>
            </li>

            <div id="settings"> 
               <Link to="/settings">SETTINGS<i class="fa fa-cog fa-3x" aria-hidden="true"></i></Link>
            </div> 

        </div>
 
    )
}

export default Sidebar