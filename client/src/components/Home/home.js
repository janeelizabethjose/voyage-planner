import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../global';
import { theme } from '../Themes/theme';
import './home.css';

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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    const [open, setOpen] = useState(false);
    const node = useRef();
    const menuId = "main-menu";
    const [Trip, setTrip] = useState([]);
    const [userID, setUserID] = useState(0);

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
                    console.log(response.data.rows);
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

    return (
        <ThemeProvider theme={theme}>
            <Header />

            <>
                {/* <GlobalStyles /> */}
                <Burger></Burger>
                <div ref={node}>
                    <FocusLock disabled={!open}>
                        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                        <Menu open={open} setOpen={setOpen} id={menuId} />
                    </FocusLock>
                </div>
                <div style={{ paddingTop: "150px" }}>
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
                                        <StyledTableCell align="right">{row.start_date}</StyledTableCell>
                                        <StyledTableCell align="right">{row.end_date}</StyledTableCell>
                                        <StyledTableCell align="right">{row.destination}</StyledTableCell>
                                        <StyledTableCell align="right"><Link
                                            component="button"
                                            variant="body2"
                                            onClick={() => props.history.push(
                                                {
                                                    pathname: '/trip',
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

            </>
        </ThemeProvider>
    )
}

export default withRouter(Home);