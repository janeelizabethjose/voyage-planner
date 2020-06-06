import React, { useState, useRef, useEffect, useSelector } from 'react';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Header from '../Header/header';

import { theme } from '../Themes/theme';

import { useOnClickOutside } from '../../hooks';
import Burger from '../Burger/burger';
import Menu from '../Menu/menu';
import FocusLock from 'react-focus-lock';
import Trip from '../Trip/trip';
import TripDayForm from '../TripDay/tripDay';


function TripDashboardForm(props) {
    const [open, setOpen] = useState(false);
    const node = useRef();
    const menuId = "main-menu";

    // const [tripDetail, setTripDetail] = useState(props.history.location.state.detail);
    // const startDate = moment(tripDetail.start_date).format('YYYY-MM-DD');
    // const endDate = moment(tripDetail.end_date).format('YYYY-MM-DD');
    // var momentStartDate = moment(startDate);
    // var momentendDate = moment(endDate);
    // var dateDiff = momentendDate.diff(momentStartDate, 'days');

    useOnClickOutside(node, () => setOpen(false));

    useEffect(() => {
        //getTripInformation();
    }, []);

    // const classes = useStyles();
    // const GoBackButton = withRouter(({ history }) => (
    //     <IconButton onClick={() => history.goBack()}>
    //         <Icon>chevron_left</Icon>
    //     </IconButton>
    // ));
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
            <Trip />
            <TripDayForm />
        </ThemeProvider >
    )
}

export default withRouter(TripDashboardForm);