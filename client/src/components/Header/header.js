import React from 'react';
import { withRouter } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FlightIcon from '@material-ui/icons/Flight';
import { Tooltip, Button } from '@material-ui/core';
import './header.css';

function Header(props) {

    const handleLogout = (e) => {
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
                    <Button variant="contained" color="secondary" onClick={() => handleLogout()}><ExitToAppIcon /></Button>
                </Tooltip>
            </div>
        </div>
    )
}
export default withRouter(Header);