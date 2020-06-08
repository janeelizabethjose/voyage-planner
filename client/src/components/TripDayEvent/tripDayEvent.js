import React from 'react';
import { withRouter } from "react-router-dom";
import * as moment from 'moment';

import {
    Chip, createStyles, Typography, makeStyles, Icon, Paper, Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
    })
);

function TripDayEventForm(props) {

    const classes = useStyles({});
    const eventIcon = (category) => {
        if (category === 1) {
            return <Icon className={classes.icon} style={{ transform: "scale(2.8)" }}> directions_run</Icon>;
        } else if (category === 2) {
            return <Icon className={classes.icon} style={{ transform: "scale(2.8)" }}>directions_bus</Icon>;
        } else if (category === 3) {
            return <Icon className={classes.icon} style={{ transform: "scale(2.8)" }}> info</Icon>;
        } else if (category === 4) {
            return <Icon className={classes.icon} style={{ transform: "scale(2.8)" }}> hotel</Icon>;
        } else if (category === 5) {
            return <Icon className={classes.icon} style={{ transform: "scale(2.8)" }}> flight</Icon>;
        } else if (category === 6) {
            return <Icon className={classes.icon} style={{ transform: "scale(2.8)" }}>directions_boat</Icon>;
        }
    };

    return (
        <div className={classes.eventWrapper} style={{ marginTop: "30px" }} >
            {props.TripDayEvents && props.TripDayEvents.map((row) => (
                < Paper className={classes.paperRoot} style={{ marginTop: "50px" }} key={row.id}>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={2} style={{ borderRight: '2px dodgerblue solid' }}>
                            {eventIcon(row.category_id)}
                        </Grid>
                        <Grid item xs={false}>
                            <Grid container direction='column' style={{ textAlign: "left" }}>
                                <Typography variant='h5' component='h3'>
                                    <strong>{row.title}</strong>
                                </Typography>
                                <Typography variant='subtitle1'><strong>Start at: </strong> {moment(row.start_time, "HH:mm:ss").format("hh:mm A")}</Typography>
                                <Typography variant='subtitle1'><strong>End at: </strong> {moment(row.end_time, "HH:mm:ss").format("hh:mm A")}</Typography>
                                <Typography variant='subtitle1'><strong>From: </strong>{row.start_location}</Typography>
                                <Typography variant='subtitle1'><strong>To: </strong>{row.end_location}</Typography>
                                <Typography variant='subtitle1'>
                                    <strong> Cost: </strong>{row.cost} ({row.currency_code})
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center'>
                                <Icon>label</Icon>
                                {row.tag && row.tag.split(',').map((t, index) => (
                                    <Chip key={`${t}-${index}`} size='small' label={t} className={classes.chip} color='primary' />
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper >
            ))}
        </div >
    )
}

export default withRouter(TripDayEventForm);