import 'date-fns';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { TextField, Button, MenuItem, Radio, RadioGroup, Icon, Grid, FormLabel, FormControlLabel, Chip, createStyles, Dialog, DialogContent, DialogTitle, } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { currency } from '../../assets/currency';
import { category } from '../../assets/category';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        width: "50%",
    };
}

let txtTitle, intCategoryID, dtStartTime, dtEndTime, txtStartLocation, txtEndLocation, intCost, intCurrencyID, txtNote, txtTag;
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function EventInfoForm(props) {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const handleStartEventTimeChange = (startTime) => {
        props.updateStartEventTime(startTime);
    };

    const handleEndEventTimeChange = (endTime) => {
        props.updateEndEventTime(endTime);
    };

    const handleClose = () => {
        props.toggleModal();
    };

    const handleAddEvent = () => {
        let eventDetails = {}
        eventDetails.title = txtTitle;
        eventDetails.categoryID = intCategoryID;
        eventDetails.startLocation = txtStartLocation;
        eventDetails.endLocation = txtEndLocation;
        eventDetails.cost = intCost;
        eventDetails.currencyID = intCurrencyID;
        eventDetails.note = txtNote;
        eventDetails.tag = txtTag;
        props.insertTripEventInfo(eventDetails);
    };

    const handleGetTitle = (e) => {
        txtTitle = e.target.value;
    }

    const handleGetCategory = (e) => {
        intCategoryID = e.target.value;
    }

    const handleGetStartLocation = (e) => {
        txtStartLocation = e.target.value;
    }

    const handleGetEndLocation = (e) => {
        txtEndLocation = e.target.value;
    }

    const handleGetCost = (e) => {
        intCost = e.target.value;
    }

    const handleGetCurrency = (e) => {
        intCurrencyID = e.target.value;
    }

    const handleGetNote = (e) => {
        txtNote = e.target.value;
    }

    const handleGetTag = (e) => {
        txtTag = e.target.value;
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h4 id="simple-modal-title">Add a Trip Event</h4>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Title *" onChange={handleGetTitle} fullWidth />

                <TextField
                    select
                    label='Event Category'
                    name='category_id'
                    onChange={handleGetCategory}
                    fullWidth
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}>
                    {category.map(c => (
                        <MenuItem key={c.id} value={c.id}>
                            <Icon>{c.icon}</Icon>
                            <span>{c.name}</span>
                        </MenuItem>
                    ))}
                </TextField>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="starttime-picker"
                                label="Start Time"
                                value={props.eventStartTime}
                                onChange={handleStartEventTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="endtime-picker"
                                label="End Time"
                                value={props.eventEndTime}
                                onChange={handleEndEventTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Start Location *" onChange={handleGetStartLocation} fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="End Location *" onChange={handleGetEndLocation} fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Cost *" onChange={handleGetCost} fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            label='Currency'
                            name='currency_id'
                            onChange={handleGetCurrency}
                            fullWidth
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}>
                            {currency.map(c => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.code}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Notes *" onChange={handleGetNote} fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Tag'
                            name='tag'
                            helperText='Use comma to separate tag'
                            //value={tag}
                            onChange={handleGetTag}
                            multiline
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <div className={classes.root}>
                    <Button variant="contained" color="secondary" onClick={handleAddEvent}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
    return (
        <div>
            <Modal
                open={props.showModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}
export default EventInfoForm;