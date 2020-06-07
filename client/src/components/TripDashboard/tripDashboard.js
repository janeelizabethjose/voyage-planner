import React from 'react';
import { withRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Header from '../Header/header';

import { theme } from '../Themes/theme';

import Trip from '../Trip/trip';
import TripDay from '../TripDay/tripDay';


function TripDashboardForm(props) {
    return (
        <ThemeProvider theme={theme}>
            <Header /> "sfsdfdsf"
            <Trip />
            <TripDay />
        </ThemeProvider >
    )
}

export default withRouter(TripDashboardForm);