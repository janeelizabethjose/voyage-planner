import React, { useState, useRef, useEffect, useSelector } from 'react';
import { withRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Header from '../Header/header';

import { theme } from '../Themes/theme';

import { useOnClickOutside } from '../../hooks';
import Burger from '../Burger/burger';
import Menu from '../Menu/menu';
import FocusLock from 'react-focus-lock';
import Trip from '../Trip/trip';
import TripDay from '../TripDay/tripDay';


function TripDashboardForm(props) {
    const [TripData, setTripData] = useState([]);
    const [open, setOpen] = useState(false);
    const node = useRef();
    const menuId = "main-menu";

    useOnClickOutside(node, () => setOpen(false));

    useEffect(() => {
        //getTripInformation();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Burger></Burger>
            <div ref={node}>
                <FocusLock disabled={!open}>
                    <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                    <Menu open={open} setOpen={setOpen} id={menuId} />
                </FocusLock>
            </div>
            <Trip TripData={TripData} />
            <TripDay />
        </ThemeProvider >
    )
}

export default withRouter(TripDashboardForm);