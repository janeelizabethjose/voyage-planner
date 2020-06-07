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
    return (
        <div className="topnav">
            <span className="header">VOYAGE PLANNER</span>
            <div className="topnav-right">
                <button onClick={() => handleLogout()}><ExitToAppIcon /></button>
            </div>
        </div>
    )
}
export default withRouter(Header);