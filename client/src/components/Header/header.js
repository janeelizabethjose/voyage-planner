import React from 'react';
import { withRouter } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './header.css';

function Header(props) {

    const handleLogout = (e) => {
        console.log('hete');
        //setIsLoggedIn(false);

        localStorage.clear("userID");
        localStorage.clear("email");
        localStorage.getItem('userID');
        props.history.push('/login');
    }
    // const capitalize = (s) => {
    //     if (typeof s !== 'string') return ''
    //     return s.charAt(0).toUpperCase() + s.slice(1)
    // }
    //const title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    return (
        // <nav className="navbar navbar-dark bg-primary navBarHeader">
        //     <div className="row col-12 d-flex justify-content-center text-white">
        //         {/* <span className="h3">{props.title || title}</span> */}
        //         <span className="h3">Voyage Planner</span>
        //         <div className="logout">
        //             <button onClick={() => handleLogout()}><ExitToAppIcon/></button>
        //         </div>
        //     </div>
        // </nav>
        // <div class="navbar">
        //     <a href="#contact">Contact</a>
        // </div>
        <div className="topnav">
            <span className="header">VOYAGE PLANNER</span>
            <div className="topnav-right">
                <button onClick={() => handleLogout()}><ExitToAppIcon /></button>
            </div>
        </div>
    )
}
export default withRouter(Header);