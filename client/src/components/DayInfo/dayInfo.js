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

let textName;

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

function DayInfoForm(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const handleDateChange = (date) => {
        props.updateTripDate(date)
    };

    const handleClose = () => {
        props.toggleModal();
    };

    const handleAddDay = () => {
        props.insertDayInfo(textName);
    };

    const handleGetName = (e) => {
        textName = e.target.value;
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Add a Trip Day</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name *" onChange={handleGetName} fullWidth />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Trip Date"
                        format="dd-MM-yyyy"
                        value={props.InitialDate}
                        onChange={handleDateChange}
                        maxDate={props.TripMaxDate}
                        disablePast="true"
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
                <div className={classes.root}>
                    <Button variant="contained" color="secondary" onClick={handleAddDay}>
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
export default DayInfoForm;