import 'date-fns';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "50%",
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

function TripInfoForm(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const handleStartDateChange = (date) => {
        props.updateStartDate(date)
    };

    const handleEndDateChange = (date) => {
        props.updateEndDate(date)
    };

    const handleClose = () => {
        props.toggleModal();
    };

    const handleAddTrip = () => {
        let tripDetails = {}
        if (props.Name && props.Destination) {
            tripDetails.Name = props.Name;
            tripDetails.Destinaton = props.Destination;
            props.insertTripInfo(tripDetails);
        } else {
            if (props.Name == "" || props.Name == null || props.Name == undefined) {
                props.validateName();
            }
            if (props.Destination == "" || props.Destination == null || props.Destination == undefined) {
                props.validateDestination();
            }
        }
    };

    const handleGetName = (e) => {
        props.updateName(e.target.value);
    }

    const handleGetDestination = (e) => {
        props.updateDestination(e.target.value);
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Add a Trip</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    error={props.checkName}
                    helperText="Please enter name"
                    id="standard-basic"
                    label="Name *"
                    onChange={handleGetName}
                    helperText={props.checkName ? 'Enter Name' : ''}
                    fullWidth
                />
                <TextField
                    error={props.checkDestination}
                    id="standard-basic"
                    label="Destination *"
                    onChange={handleGetDestination}
                    helperText={props.checkDestination ? 'Enter Destination' : ''}
                    fullWidth
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start Date"
                        format="dd-MM-yyyy"
                        value={props.InitialStartDate}
                        onChange={handleStartDateChange}
                        disablePast="true"
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="dd-MM-yyyy"
                        value={props.InitialEndDate}
                        minDate={props.InitialStartDate}
                        onChange={handleEndDateChange}
                        disablePast="true"
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
                <div className={classes.root}>
                    <Button variant="contained" color="secondary" onClick={handleAddTrip}>
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
export default TripInfoForm;