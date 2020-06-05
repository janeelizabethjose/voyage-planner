import React, { useState, useRef, useEffect, useSelector } from 'react';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, IconButton, Icon, Typography, Fab } from '@material-ui/core';
import Header from '../Header/header';

import { theme } from '../Themes/theme';

import { useOnClickOutside } from '../../hooks';
import Burger from '../Burger/burger';
import Menu from '../Menu/menu';
import FocusLock from 'react-focus-lock';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 0),
    },
    fab: {
        margin: theme.spacing(0.25),
    },
}));

function TripForm(props) {
    const [tripDetail, setTripDetail] = useState(props.history.location.state.detail);
    //console.log('props' +JSON.stringify(props.history.location.state.detail))
    // const tripDetail = useState(JSON.stringify(props.history.location.state.detail));
    console.log("here" + tripDetail.destination);
    const [open, setOpen] = useState(false);
    const node = useRef();
    const menuId = "main-menu";

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
        <ThemeProvider theme={theme}>
            <Header />
            <Burger></Burger>
            <div ref={node}>
                <FocusLock disabled={!open}>
                    <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                    <Menu open={open} setOpen={setOpen} id={menuId} />
                </FocusLock>
            </div>
            <div className={classes.root} style={{ paddingTop: "120px", width: "99%", marginLeft: "200px" }}>
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
                                    2020-06-02 ~ 2020-06-06 (4 days)
                        {/* {tripDetail.start_date} ~ {tripDetail.end_date} ({dateDiff} days) */}
                                </Typography>
                                <Typography variant='body2'>
                                    Let's go to Kuala Lumpur
                        {/* {tripDetail.name} */}
                                </Typography>
                                {/* {!isEmpty(tripDetail.name) && <Typography variant='body2'>{tripDetail.name}</Typography>} */}
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
        </ThemeProvider>
    )
}

export default withRouter(TripForm);