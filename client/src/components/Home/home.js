import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../Themes/theme';
import TripInfo from '../TripInfo/tripInfo';

import Header from '../Header/header';

import Link from '@material-ui/core/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';

import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

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

const useStyles = makeStyles({
    table: {
        minWidth: 800,
    },
});
//table end

function Home(props) {
    const [openModal, setOpenModal] = useState(false);
    const [Trip, setTrip] = useState([]);
    const [userID, setUserID] = useState(0);
    const [startDate, setStartDate] = useState(moment().format('MM-DD-YYYY'));
    const [endDate, setEndDate] = useState(moment().format('MM-DD-YYYY'));

    const [checkName, setCheckName] = useState(false);
    const [checkDestination, setcheckDestination] = useState(false);
    const [Name, setName] = useState();
    const [Destination, setDestination] = useState();

    const classes = useStyles();

    useEffect(() => {
        getTripInformation();
    }, [userID]);

    const getTripInformation = (e) => {
        //props.showError(null);
        if (localStorage.getItem("userID")) {
            const payload = {
                "userID": localStorage.getItem("userID"),
            }
            console.log(payload);
            axios.get(API_BASE_URL + 'getTripInfo?userID=' + payload.userID)
                .then(function (response) {
                    if (response.status === 200) {
                        setTrip(response.data.rows);
                    }
                    else if (response.status === 204) {
                        console.log("Something went wrong!");
                        //props.showError("Something went wrong!");
                    }
                    else {
                        console.log("Something went wrong!");
                        //props.showError("Something went wrong!");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log("No user details found!");
        }
    };

    const handleUpdateName = (data) => {
        setName(data);
    }

    const handleUpdateDestination = (data) => {
        setDestination(data);
    }

    const validateName = () => {
        setCheckName(true);
    }

    const validateDestination = () => {
        setcheckDestination(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setCheckName(false);
        setcheckDestination(false);
        setDestination();
        setName();
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleUpdateStartDate = (metaData) => {
        setStartDate(moment(metaData).format('YYYY-MM-DD'))
        setEndDate(moment(metaData).format('YYYY-MM-DD'))
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
                {/* <Burger></Burger>
                <div ref={node}>
                    <FocusLock disabled={!open}>
                        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                        <Menu open={open} setOpen={setOpen} id={menuId} />
                    </FocusLock>
                </div> */}

                <div style={{ paddingTop: "150px" }}>
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal()} style={{ marginLeft: "800px", marginBottom: "20px" }}>
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
                    Name={Name}
                    Destination={Destination}
                    InitialStartDate={startDate}
                    InitialEndDate={endDate}
                    checkName={checkName}
                    checkDestination={checkDestination}
                    updateName={handleUpdateName}
                    updateDestination={handleUpdateDestination}
                    toggleModal={handleCloseModal}
                    updateStartDate={handleUpdateStartDate}
                    updateEndDate={handleUpdatEndDate}
                    insertTripInfo={handleinsertTripInfo}
                    validateName={validateName}
                    validateDestination={validateDestination}
                />
            </>
        </ThemeProvider>
    )
}

export default withRouter(Home);