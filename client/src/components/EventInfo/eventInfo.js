import 'date-fns';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { TextField, Button, MenuItem, Radio, RadioGroup, Icon, Grid, FormLabel, FormControlLabel, Chip, createStyles, Dialog, DialogContent, DialogTitle, } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';
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

function EventInfoForm(props) {
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
            <h4 id="simple-modal-title">Add a Trip Event</h4>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Title *" onChange={handleGetName} fullWidth />

                <TextField
                    select
                    label='Event Category'
                    name='category_id'
                    onChange={handleGetName}
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
                            <DateTimePicker
                                label='Start Time'
                                name='start_time'
                                margin='normal'
                                format="dd-MM-yyyy hh:mm"
                                value={new Date()}
                                onChange={handleDateChange}
                                maxDate={new Date()}
                                disablePast="true"
                                clearable
                                fullWidth
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                label='End Time'
                                name='end_time'
                                margin='normal'
                                format="dd-MM-yyyy HH:MM"
                                value={new Date()}
                                onChange={handleDateChange}
                                maxDate={new Date()}
                                disablePast="true"
                                clearable
                                fullWidth
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Start Location *" onChange={handleGetName} fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="End Location *" onChange={handleGetName} fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" label="Cost *" onChange={handleGetName} fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            label='Currency'
                            name='currency_id'
                            onChange={handleGetName}
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
                        <TextField id="standard-basic" label="Notes *" onChange={handleGetName} fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Tag'
                            name='tag'
                            helperText='Use comma to separate tag'
                            //value={tag}
                            onChange={handleGetName}
                            multiline
                            fullWidth
                        />
                    </Grid>
                </Grid>
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
export default EventInfoForm;