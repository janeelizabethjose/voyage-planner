import React, { useState, useEffect } from 'react';
import { createStyles, Divider, Icon, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Theme } from '@material-ui/core';
import { withRouter } from "react-router-dom";

import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiContants';
import DayInfo from '../DayInfo/dayInfo';
import * as moment from 'moment';

import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme) =>
    createStyles({
        tripDayList: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);

function TripDayForm(props) {
    const [tripDetail, setTripDetail] = useState(props.history.location.state.detail);
    const classes = useStyles();

    const [TripDay, setTripDay] = useState([]);
    const [TripDate, setTripDate] = useState(moment().format('MM-DD-YYYY'));

    useEffect(() => {
        getTripDayInformation();
    }, []);

    const getTripDayInformation = (e) => {
        const payload = {
            "userID": localStorage.getItem("userID"),
            "tripID": tripDetail.id,
        }
        axios.post(API_BASE_URL + 'getTripDayInfo', payload)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setTripDay(response.data.rows);
                }
                else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleUpdateTripDate = (metaData) => {
        setTripDate(moment(metaData).format('YYYY-MM-DD'))
    }

    const handleinsertDayInfo = (metaData) => {
        console.log(metaData);
        const payload = {
            "name": metaData,
            "tripDate": moment(TripDate).format('YYYY-MM-DD'),
            "userID": localStorage.getItem("userID"),
            "tripID": tripDetail.id,
        }
        axios.post(API_BASE_URL + 'createTripDay', payload)
            .then(function (response) {
                if (response.status === 200) {
                    handleCloseModal();
                    getTripDayInformation();
                }
                else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={classes.root} style={{ marginTop: "10px", marginLeft: "200px" }}>
                <Paper style={{ width: "200px" }}>
                    <List>
                        <ListItem button key='New Day' onClick={() => handleOpenModal()}>
                            <ListItemIcon>
                                <Icon>add</Icon>
                            </ListItemIcon>
                            <ListItemText primary='New Day' />
                        </ListItem>
                        <Divider />
                        {TripDay && TripDay.map((row) => (
                            <ListItem key={row.id}>
                                <ListItemText>{moment(row.trip_date).format('YYYY-MM-DD')}</ListItemText>
                                <ListItemIcon>
                                    <Icon>chevron_right</Icon>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </div>
            <DayInfo
                showModal={open}
                InitialDate={TripDate}
                toggleModal={handleCloseModal}
                insertDayInfo={handleinsertDayInfo}
                updateTripDate={handleUpdateTripDate}
            />
        </>
    )
}

export default withRouter(TripDayForm);