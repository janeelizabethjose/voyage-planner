import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function DayInfoForm(props) {
    console.log('from parent after click : ' + JSON.stringify(props.showModal));
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const handleClose = () => {
        props.toggleModal();
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Add Day</h2>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Standard" />
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