import React, { useState, useEffect } from 'react';
import { createStyles, Divider, Icon, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Theme, Button, Grid } from '@material-ui/core';
import { withRouter } from "react-router-dom";

import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiContants';
import DayInfo from '../DayInfo/dayInfo';
import EventInfo from '../EventInfo/eventInfo';
import * as moment from 'moment';

import TripDayEvent from '../TripDayEvent/tripDayEvent';

const useStyles = makeStyles((theme) =>
    createStyles({
        tripDayList: {
            backgroundColor: theme.palette.background.paper,
        },
        root: {
            display: "flex",
            "& > *": {
            }
        }
    })
);

function TripDayForm(props) {
    const [open, setOpen] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [tripDetail, setTripDetail] = useState(props.history.location.state.detail);
    const classes = useStyles();

    const [TripDay, setTripDay] = useState([]);
    const [TripDayEvents, setTripDayEvents] = useState([]);
    const [TripDate, setTripDate] = useState(moment(props.location.state.detail.start_date).format('MM-DD-YYYY'));
    const [TripMaxDate, setTripMaxDate] = useState(moment(props.location.state.detail.end_date).format('MM-DD-YYYY'));

    useEffect(() => {
        getTripDayInformation();
    }, []);

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleUpdateTripDate = (metaData) => {
        setTripDate(moment(metaData).format('YYYY-MM-DD'));
    }

    const handleOpenEventModal = () => {
        setOpenEvent(true);
    }

    const handleCloseEventModal = () => {
        setOpenEvent(false);
    }

    const getTripDayInformation = (e) => {
        const payload = {
            "userID": localStorage.getItem("userID"),
            "tripID": tripDetail.id,
        }
        axios.post(API_BASE_URL + 'getTripDayInfo', payload)
            .then(function (response) {
                if (response.status === 200) {
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

    const handleinsertDayInfo = (metaData) => {
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
    };

    const handleTripDayEvent = (metaData) => {
        const payload = {
            "tripDayID": metaData,
            "userID": localStorage.getItem("userID"),
        }
        axios.post(API_BASE_URL + 'getTripDayEventInfo', payload)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setTripDayEvents(response.data.rows);
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
                            <ListItem
                                key={row.id}
                                button
                                // selected={dashboard.selectedTripDayId === tripDay.id}
                                onClick={() => handleTripDayEvent(row.id)}
                            >
                                <ListItemText>{moment(row.trip_date).format('YYYY-MM-DD')}</ListItemText>
                                <ListItemIcon>
                                    <Icon>chevron_right</Icon>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Paper style={{ width: "690px", marginLeft: "20px" }}>
                    <div>
                        <Grid container direction='row' justify='flex-start' alignItems='center' spacing={2}>
                            <Grid item>
                                <Button
                                    className={classes.button}
                                    variant='contained'
                                    color='primary'
                                    size='medium'
                                    onClick={() => handleOpenEventModal()}
                                >
                                    <Icon className={classes.buttonIcon}>add</Icon> New Event
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <TripDayEvent
                        TripDayEvents={TripDayEvents}
                    />
                    {/* {tripEventList.map((tripEvent: TripEvent) => ( */}
                    {/* <EventComponent /> */}
                    {/* ))} */}
                </Paper>
            </div>
            <DayInfo
                showModal={open}
                InitialDate={TripDate}
                TripMaxDate={TripMaxDate}
                toggleModal={handleCloseModal}
                insertDayInfo={handleinsertDayInfo}
                updateTripDate={handleUpdateTripDate}
            />

            <EventInfo
                showModal={openEvent}
                InitialDate={TripDate}
                TripMaxDate={TripMaxDate}
                toggleModal={handleCloseEventModal}
                insertDayInfo={handleinsertDayInfo}
                updateTripDate={handleUpdateTripDate}
            />
        </>
    )
}

export default withRouter(TripDayForm);