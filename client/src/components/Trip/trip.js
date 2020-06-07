import React, { useState, useRef, useEffect, useSelector } from 'react';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, IconButton, Icon, Typography, Fab } from '@material-ui/core';
import Header from '../Header/header';

import { theme } from '../Themes/theme';
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

    useEffect(() => {
        //getTripInformation();
    }, []);

    const classes = useStyles();
    const GoBackButton = withRouter(({ history }) => (
        <IconButton onClick={() => history.goBack()}>
            <Icon>chevron_left</Icon>
        </IconButton>
    ));
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
                        <Fab color='primary' size='small' aria-label='edit' className={classes.fab}>
                            <Icon>edit</Icon>
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default withRouter(TripForm);