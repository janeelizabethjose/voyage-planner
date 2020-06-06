import React, { useState, useEffect } from 'react';
import { createStyles, Divider, Icon, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Theme } from '@material-ui/core';
import { withRouter } from "react-router-dom";
//import { RootState } from '../constants/types';
//import { TripDay } from '../models/trip-day';
//import { openTripDayForm, updateSelectedTripDayId } from '../store/actions/dashboard-actions';

import DayInfo from '../DayInfo/dayInfo';

const useStyles = makeStyles((theme) =>
    createStyles({
        tripDayList: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);

function TripDayForm(props) {

    const classes = useStyles();
    useEffect(() => {
    }, []);

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleOpenModal = () => {
        setOpen(true);
    }

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={classes.root} style={{ marginTop: "10px", marginLeft: "200px" }}>
                <Paper style={{ width: "200px" }}>
                    <List>
                        <ListItem button key='New Day' onClick={() => handleOpenModal()}>
                            <ListItemIcon>
                                <Icon>add</Icon>
                            </ListItemIcon>
                            <ListItemText primary='New Day' />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary='2020-05-30' />
                            <ListItemIcon>
                                <Icon>chevron_right</Icon>
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </Paper>
            </div>
            <DayInfo showModal={open} toggleModal={handleCloseModal} />
        </>
    )
}

export default withRouter(TripDayForm);