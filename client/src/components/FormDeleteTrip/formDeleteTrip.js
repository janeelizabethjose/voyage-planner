import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';

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

function FormDeleteTrip(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const handleClose = () => {
        props.toggleModal();
    };

    const handleDeleteTrip = () => {
        props.deleteTripPlan();
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Delete Trip</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <label>Do you want to delete this trip and it's corresponding details?</label>
                <div className={classes.root}>
                    <Button variant="contained" color="secondary" onClick={handleDeleteTrip}>
                        Confirm
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Cancel
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
export default FormDeleteTrip;