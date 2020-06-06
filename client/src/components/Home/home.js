import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../global';
import { theme } from '../Themes/theme';
import './home.css';
import TripInfo from '../TripInfo/tripInfo';

import Header from '../Header/header';

import { useOnClickOutside } from '../../hooks';
import Burger from '../Burger/burger';
import Menu from '../Menu/menu';
import FocusLock from 'react-focus-lock';

import Link from '@material-ui/core/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiContants';
import { Route, withRouter } from "react-router-dom";

//table start
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import * as moment from 'moment';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, startDate, endDate, destination, actions) {
    return { name, startDate, endDate, destination, actions };
}

const useStyles = makeStyles({
    table: {
        minWidth: 800,
    },
});
//table end

function Home(props) {
    const [open, setOpen] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const node = useRef();
    const menuId = "main-menu";
    const [Trip, setTrip] = useState([]);
    const [userID, setUserID] = useState(0);
    const [startDate, setStartDate] = useState(moment().format('MM-DD-YYYY'));
    const [endDate, setEndDate] = useState(moment().format('MM-DD-YYYY'));

    useOnClickOutside(node, () => setOpen(false));
    //table start
    const classes = useStyles();
    //table end

    useEffect(() => {
        getTripInformation();
    }, [userID]);

    const getTripInformation = (e) => {
        props.showError(null);
        const payload = {
            "userID": localStorage.getItem("userID"),
        }
        axios.post(API_BASE_URL + 'getTripInfo', payload)
            .then(function (response) {
                if (response.status === 200) {
                    setTrip(response.data.rows);
                }
                else if (response.status === 204) {
                    props.showError("Something went wrong!");
                }
                else {
                    props.showError("Something went wrong!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleUpdateStartDate = (metaData) => {
        setStartDate(moment(metaData).format('YYYY-MM-DD'))
    }

    const handleUpdatEndDate = (metaData) => {
        setEndDate(moment(metaData).format('YYYY-MM-DD'))
    }

    const handleinsertTripInfo = (metaData) => {
        const payload = {
            "name": metaData.Name,
            "destination": metaData.Destinaton,
            "startDate": moment(startDate).format('YYYY-MM-DD'),
            "endDate": moment(endDate).format('YYYY-MM-DD'),
            "userID": localStorage.getItem("userID")
        }
        axios.post(API_BASE_URL + 'createTrip', payload)
            .then(function (response) {
                if (response.status === 200) {
                    handleCloseModal();
                    getTripInformation();
                }
                else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <Header />

            <>
                <Burger></Burger>
                <div ref={node}>
                    <FocusLock disabled={!open}>
                        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                        <Menu open={open} setOpen={setOpen} id={menuId} />
                    </FocusLock>
                </div>

                <div style={{ paddingTop: "150px", paddingLeft: "150px" }}>
                    <Button variant="contained" color="secondary" onClick={() => handleOpenModal()} style={{ marginLeft: "800px", marginBottom: "20px" }}>
                        Add a New Trtip
                    </Button>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Trip Name</StyledTableCell>
                                    <StyledTableCell align="right">Start Date</StyledTableCell>
                                    <StyledTableCell align="right">End Date</StyledTableCell>
                                    <StyledTableCell align="right">Destination</StyledTableCell>
                                    <StyledTableCell align="right">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Trip.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{moment(row.start_date).format('YYYY-MM-DD')}</StyledTableCell>
                                        <StyledTableCell align="right">{moment(row.end_date).format('YYYY-MM-DD')}</StyledTableCell>
                                        <StyledTableCell align="right">{row.destination}</StyledTableCell>
                                        <StyledTableCell align="right"><Link
                                            component="button"
                                            variant="body2"
                                            onClick={() => props.history.push(
                                                {
                                                    pathname: '/tripDashboard',
                                                    state: { detail: row }
                                                }
                                            )}
                                        ><VisibilityIcon />
                                        </Link>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <TripInfo
                    showModal={openModal}
                    InitialStartDate={startDate}
                    InitialEndDate={endDate}
                    toggleModal={handleCloseModal}
                    updateStartDate={handleUpdateStartDate}
                    updateEndDate={handleUpdatEndDate}
                    insertTripInfo={handleinsertTripInfo}
                />
            </>
        </ThemeProvider>
    )
}

export default withRouter(Home);