import 'date-fns';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { TextField, Button, MenuItem, Icon, Grid } from '@material-ui/core';
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

let txtTitle, intCategoryID, txtStartLocation, txtEndLocation, intCost, intCurrencyID, txtNote, txtTag;
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
        if (
            props.Title &&
            props.Cost &&
            props.Category &&
            props.Currency &&
            props.StartLocation &&
            props.EndLocation
        ) {
            let eventDetails = {}
            eventDetails.title = props.Title;
            eventDetails.categoryID = props.Category;
            eventDetails.startLocation = props.StartLocation;
            eventDetails.endLocation = props.EndLocation;
            eventDetails.cost = props.Cost;
            eventDetails.currencyID = props.Currency;
            eventDetails.note = txtNote;
            eventDetails.tag = txtTag;
            props.insertTripEventInfo(eventDetails);
        } else {
            if (props.Title === "" || props.Title === null || props.Title === undefined) {
                props.validateTitle();
            }
            if (props.Cost === "" || props.Cost === null || props.Cost === undefined) {
                props.validateCost();
            }
            if (props.Category === "" || props.Category === null || props.Category === undefined || props.Category < 1) {
                props.validateCategory();
            }
            if (props.Currency === "" || props.Currency === null || props.Currency === undefined || props.Currency < 1) {
                props.validateCurrency();
            }
            if (props.StartLocation === "" || props.StartLocation === null || props.StartLocation === undefined) {
                props.validateStartLocation();
            }
            if (props.EndLocation === "" || props.EndLocation === null || props.EndLocation === undefined) {
                props.validateEndLocation();
            }
        }
    };

    const handleGetTitle = (e) => {
        props.updateTitle(e.target.value);
    }

    const handleGetCategory = (e) => {
        props.updateCategory(e.target.value);
    }

    const handleGetStartLocation = (e) => {
        props.updateStartLocation(e.target.value);
    }

    const handleGetEndLocation = (e) => {
        props.updateEndLocation(e.target.value);
    }

    const handleGetCost = (e) => {
        props.updateCost(e.target.value);
    }

    const handleGetCurrency = (e) => {
        props.updateCurrency(e.target.value);
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
                <TextField
                    id="standard-basic"
                    label="Title *"
                    onChange={handleGetTitle}
                    fullWidth
                    helperText={props.checkTitle ? 'Enter Title' : ''}
                    error={props.checkTitle}
                />

                <TextField
                    select
                    label='Event Category'
                    name='category_id'
                    onChange={handleGetCategory}
                    fullWidth
                    defaultValue={0}
                    error={props.checkCategory}
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
                        <TextField
                            id="standard-basic"
                            label="Start Location *"
                            onChange={handleGetStartLocation}
                            fullWidth
                            helperText={props.checkStartLocation ? 'Enter Start Location' : ''}
                            error={props.checkStartLocation}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="End Location *"
                            onChange={handleGetEndLocation}
                            fullWidth
                            helperText={props.checkEndLocation ? 'Enter End Location' : ''}
                            error={props.checkEndLocation}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Cost *"
                            onChange={handleGetCost}
                            fullWidth
                            type="number"
                            helperText={props.checkCost ? 'Enter Valid Cost' : ''}
                            error={props.checkCost}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            label='Currency'
                            name='currency_id'
                            onChange={handleGetCurrency}
                            fullWidth
                            defaultValue={0}
                            error={props.checkCurrency}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}>
                            {currency.map(c => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.code} {c.code > 0 ? '-' : ''} {c.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Notes" onChange={handleGetNote} fullWidth />
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