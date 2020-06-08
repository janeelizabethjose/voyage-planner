import React, { useState, useRef } from 'react';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, IconButton, Icon, Typography, Fab, Tooltip } from '@material-ui/core';
import FormDeleteTrip from '../FormDeleteTrip/formDeleteTrip';

import * as moment from 'moment';

import { useOnClickOutside } from '../../hooks';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 0),
    },
    fab: {
        margin: theme.spacing(0.25),
    },
}));

function TripForm(props) {
    const [open, setOpen] = useState(false);
    const node = useRef();

    const [tripDetail, setTripDetail] = useState(props.history.location.state.detail);
    const startDate = moment(tripDetail.start_date).format('YYYY-MM-DD');
    const endDate = moment(tripDetail.end_date).format('YYYY-MM-DD');
    var momentStartDate = moment(startDate);
    var momentendDate = moment(endDate);
    var dateDiff = momentendDate.diff(momentStartDate, 'days');

    useOnClickOutside(node, () => setOpen(false));

    const classes = useStyles();
    const GoBackButton = withRouter(({ history }) => (
        <IconButton onClick={() => history.goBack()}>
            <Icon>chevron_left</Icon>
        </IconButton>
    ));

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleDeleteTripPlan = () => {

        if (tripDetail.id) {
            const payload = {
                "tripID": tripDetail.id,
            }
            axios.delete(API_BASE_URL + 'deleteTripPlan/' + payload.tripID)
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        handleCloseModal();
                        props.history.push(
                            { pathname: '/home' }
                        )
                    }
                    else {
                        console.log(response);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    return (
        <div className={classes.root} style={{ paddingTop: "120px" }}>
            <Paper elevation={3}>
                <Grid container alignItems='center' spacing={2}>
                    <Grid>
                        <GoBackButton />
                    </Grid>
                    <Grid item xs={15} sm container>
                        <Grid item container direction='column'>
                            <Typography variant='h5' component='h3'>
                                {tripDetail.destination}
                            </Typography>
                            <Typography variant='subtitle1'>
                                {endDate} ~ {endDate} ( {dateDiff} day(s) )
                                </Typography>
                            <Typography variant='body2'>
                                {tripDetail.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Delete Trip" aria-label="delete">
                            <Fab color='secondary' size='small' aria-label='delete' className={classes.fab} style={{ marginRight: "20px" }}>
                                <Icon onClick={() => handleOpenModal()}>delete</Icon>
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>
            <FormDeleteTrip
                showModal={open}
                toggleModal={handleCloseModal}
                deleteTripPlan={handleDeleteTripPlan}
            />
        </div>
    )
}

export default withRouter(TripForm);