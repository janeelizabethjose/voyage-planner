import React, { useState, useEffect } from 'react';
import { createStyles, Divider, Icon, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Button, Grid, Tooltip } from '@material-ui/core';
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

    const [TripName, setTripName] = useState();
    const [checkTripName, setcheckTripName] = useState(false);

    const [eventStartTime, setEventStartTime] = useState(moment());
    const [eventEndTime, setEventEndTime] = useState(moment());

    const [tripDayId, setTripDayId] = useState(0);
    const [tripDayDetails, setTripDayDetails] = useState();

    // START
    const [Title, setTitle] = useState();
    const [checkTitle, setCheckTitle] = useState(false);

    const handleUpdateTitle = (data) => {
        setTitle(data);
    }
    const handleValidateTitle = () => {
        setCheckTitle(true);
    }

    const [Cost, setCost] = useState();
    const [checkCost, setCheckCost] = useState(false);

    const handleUpdateCost = (data) => {
        setCost(data);
    }
    const handleValidateCost = () => {
        setCheckCost(true);
    }

    const [Category, setCategory] = useState();
    const [checkCategory, setCheckCategory] = useState(false);

    const handleUpdateCategory = (data) => {
        setCategory(data);
    }
    const handleValidateCategory = () => {
        setCheckCategory(true);
    }

    const [Currency, setCurrency] = useState();
    const [checkCurrency, setCheckCurrency] = useState(false);

    const handleUpdateCurrency = (data) => {
        setCurrency(data);
    }
    const handleValidateCurrency = () => {
        setCheckCurrency(true);
    }

    const [StartLocation, setStartLocation] = useState();
    const [checkStartLocation, setCheckStartLocation] = useState(false);

    const handleUpdateStartLocation = (data) => {
        setStartLocation(data);
    }
    const handleValidateStartLocation = () => {
        setCheckStartLocation(true);
    }

    const [EndLocation, setEndLocation] = useState();
    const [checkEndLocation, setCheckEndLocation] = useState(false);

    const handleUpdateEndLocation = (data) => {
        setEndLocation(data);
    }
    const handleValidateEndLocation = () => {
        setCheckEndLocation(true);
    }


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
        setCheckTitle(false);
        setTitle();
        setCheckCost(false);
        setCost();
        setCheckCategory(false);
        setCategory();
        setCheckCurrency(false);
        setCurrency();
        setCheckStartLocation(false);
        setStartLocation();
        setCheckEndLocation(false);
        setEndLocation();
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
        axios.get(API_BASE_URL + 'getTripDayInfo?tripID=' + payload.tripID + '&userID=' + payload.userID)
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
            "cost": parseInt(metaData.cost)
        }
        axios.post(API_BASE_URL + 'createTripDayEvent', payload)
            .then(function (response) {
                if (response.status === 200) {
                    handleCloseEventModal();
                    let metaData = {};
                    metaData.id = tripDayId;
                    handleTripDayEvent(metaData);
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
        axios.get(API_BASE_URL + 'getTripDayEventInfo?tripDayID=' + payload.tripDayID + '&userID=' + payload.userID)
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
                        <Tooltip title="Create a new day" aria-label="click">
                            <ListItem button key='New Day' onClick={() => handleOpenModal()}>
                                <ListItemIcon>
                                    <Icon>add</Icon>
                                </ListItemIcon>
                                <ListItemText primary='New Day' />
                            </ListItem>
                        </Tooltip>
                        <Divider />
                        {TripDay && TripDay.map((row) => (
                            <Tooltip title="Click here to view the event details" aria-label="click">
                                <ListItem
                                    key={row.id}
                                    button
                                    onClick={() => handleTripDayEvent(row)}
                                >
                                    <ListItemText>{moment(row.trip_date).format('YYYY-MM-DD')}</ListItemText>
                                    <ListItemIcon>
                                        <Icon>chevron_right</Icon>
                                    </ListItemIcon>
                                </ListItem>
                            </Tooltip>
                        ))}
                    </List>
                </Paper>
                <Paper style={{ width: "905px", marginLeft: "5px" }}>
                    <div>
                        <Grid container direction='row' justify='flex-start' alignItems='center' spacing={2}>
                            <Grid item>
                                {tripDayId > 0 ?
                                    <>
                                        <span style={{ fontSize: "20px", paddingRight: "50px", paddingLeft: "10px", fontWeight: "bold" }}>
                                            {tripDayDetails && tripDayDetails.name} ({moment(tripDayDetails.trip_date).format('YYYY-MM-DD')})
                                        </span>
                                        <Tooltip title="Create a new event" aria-label="click">
                                            <Button
                                                className={classes.button}
                                                variant='contained'
                                                color='primary'
                                                size='medium'
                                                onClick={() => handleOpenEventModal()}
                                            >
                                                <Icon className={classes.buttonIcon}>add</Icon> New Event
                                        </Button>
                                        </Tooltip>
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
                Title={Title}
                checkTitle={checkTitle}
                updateTitle={handleUpdateTitle}
                validateTitle={handleValidateTitle}
                Cost={Cost}
                checkCost={checkCost}
                updateCost={handleUpdateCost}
                validateCost={handleValidateCost}
                Category={Category}
                checkCategory={checkCategory}
                updateCategory={handleUpdateCategory}
                validateCategory={handleValidateCategory}
                Currency={Currency}
                checkCurrency={checkCurrency}
                updateCurrency={handleUpdateCurrency}
                validateCurrency={handleValidateCurrency}
                StartLocation={StartLocation}
                checkStartLocation={checkStartLocation}
                updateStartLocation={handleUpdateStartLocation}
                validateStartLocation={handleValidateStartLocation}
                EndLocation={EndLocation}
                checkEndLocation={checkEndLocation}
                updateEndLocation={handleUpdateEndLocation}
                validateEndLocation={handleValidateEndLocation}
                toggleModal={handleCloseEventModal}
                insertTripEventInfo={handleInsertEventInfo}
                updateStartEventTime={handleUpdateStartEventTime}
                updateEndEventTime={handleUpdateEndEventTime}
            />
        </>
    )
}

export default withRouter(TripDayForm);