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
    //console.log(props);
    //const dashboard = useSelector(state.dashboard);
    const [open, setOpen] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [tripDetail, setTripDetail] = useState(props.history.location.state.detail);
    const classes = useStyles();

    const [TripDay, setTripDay] = useState([]);
    const [TripDayEvents, setTripDayEvents] = useState([]);
    const [TripDate, setTripDate] = useState(moment(props.location.state.detail.start_date).format('MM-DD-YYYY'));
    const [TripMaxDate, setTripMaxDate] = useState(moment(props.location.state.detail.end_date).format('MM-DD-YYYY'));
    //const [TripEventDate, setTripEventDate] = useState(moment(props.location.state.detail.start_date).format('MM-DD-YYYY HH MM'));

    const [TripName, setTripName] = useState();
    const [checkTripName, setcheckTripName] = useState(false);

    const [eventStartTime, setEventStartTime] = useState(moment());
    const [eventEndTime, setEventEndTime] = useState(moment());

    const [tripDayId, setTripDayId] = useState(0);
    const [tripDayDetails, setTripDayDetails] = useState();

    useEffect(() => {
        getTripDayInformation();
    }, []);

    const handleCloseModal = () => {
        setOpen(false);
        setcheckTripName(false);
        setTripName();
    }

    const handleOpenModal = () => {
        setOpen(true);
    }
    const handleupdateTripName = (data) => {
        setTripName(data);
    }
    const handlevalidateTripName = () => {
        setcheckTripName(true);
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

    const handleUpdateStartEventTime = (startTime) => {
        setEventStartTime(startTime);
    }

    const handleUpdateEndEventTime = (endTime) => {
        setEventEndTime(endTime);
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

    const handleInsertEventInfo = (metaData) => {
        const payload = {
            "title": metaData.title,
            "tripDayID": tripDayId,
            "categoryID": metaData.categoryID,
            "userID": localStorage.getItem("userID"),
            "currencyID": metaData.currencyID,
            "startTime": moment(eventStartTime).format("HH:mm:ss"),
            "endTime": moment(eventEndTime).format("HH:mm:ss"),
            "startLocation": metaData.startLocation,
            "endLocation": metaData.endLocation,
            "note": metaData.note,
            "tag": metaData.tag,
        }
        axios.post(API_BASE_URL + 'createTripDayEvent', payload)
            .then(function (response) {
                if (response.status === 200) {
                    handleCloseEventModal();
                    handleTripDayEvent(tripDayId);
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
        if (metaData.id) {
            setTripDayId(metaData.id);
            setTripDayDetails(metaData);
        }
        const payload = {
            "tripDayID": metaData.id,
            "userID": localStorage.getItem("userID"),
        }
        axios.post(API_BASE_URL + 'getTripDayEventInfo', payload)
            .then(function (response) {
                if (response.status === 200) {
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
            <div className={classes.root} style={{ marginTop: "10px" }}>
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
                                // selected={row.id}
                                onClick={() => handleTripDayEvent(row)}
                            >
                                <ListItemText>{moment(row.trip_date).format('YYYY-MM-DD')}</ListItemText>
                                <ListItemIcon>
                                    <Icon>chevron_right</Icon>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Paper style={{ width: "905px", marginLeft: "5px" }}>
                    <div>
                        <Grid container direction='row' justify='flex-start' alignItems='center' spacing={2}>
                            <Grid item>
                                {tripDayId > 0 ?
                                    <>
                                        <span style={{ fontSize: "20px", paddingRight: "50px", paddingLeft: "10px", fontWeight: "bold" }}>{tripDayDetails && tripDayDetails.name} ({moment(tripDayDetails.trip_date).format('YYYY-MM-DD')})</span>
                                        <Button
                                            className={classes.button}
                                            variant='contained'
                                            color='primary'
                                            size='medium'
                                            onClick={() => handleOpenEventModal()}
                                        >
                                            <Icon className={classes.buttonIcon}>add</Icon> New Event
                                        </Button>
                                    </>
                                    : null}
                            </Grid>
                        </Grid>
                    </div>
                    <TripDayEvent
                        TripDayEvents={TripDayEvents}
                    />
                </Paper>
            </div>
            <DayInfo
                showModal={open}
                InitialDate={TripDate}
                TripMaxDate={TripMaxDate}
                TripName={TripName}
                checkTripName={checkTripName}
                updateTripName={handleupdateTripName}
                validateTripName={handlevalidateTripName}
                toggleModal={handleCloseModal}
                insertDayInfo={handleinsertDayInfo}
                updateTripDate={handleUpdateTripDate}
            />

            <EventInfo
                showModal={openEvent}
                eventStartTime={eventStartTime}
                eventEndTime={eventEndTime}
                toggleModal={handleCloseEventModal}
                insertTripEventInfo={handleInsertEventInfo}
                updateStartEventTime={handleUpdateStartEventTime}
                updateEndEventTime={handleUpdateEndEventTime}
            />
        </>
    )
}

export default withRouter(TripDayForm);