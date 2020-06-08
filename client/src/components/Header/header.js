import React from 'react';
import { withRouter } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FlightIcon from '@material-ui/icons/Flight';
import { Tooltip } from '@material-ui/core';
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
            <span className="header"><FlightIcon fontSize="large" color="primary" />VOYAGE PLANNER</span>
            <div className="topnav-right">
                <Tooltip title="Logout" aria-label="click">
                    <button onClick={() => handleLogout()}><ExitToAppIcon /></button>
                </Tooltip>
            </div>
        </div>
    )
}
export default withRouter(Header);