

import React, { forwardRef, memo, useState, useImperativeHandle } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
    Button, Dialog, DialogActions, DialogTitle, DialogContent,
    DialogContentText, Slide, IconButton, Typography
} from "@mui/material";
import Config from '../../../config/index';

const styles = {
    paper: {
        alignSelf: 'start',
    },
};

interface Props {
    type: string,
    onClose: () => void,
    onCancel: () => void,
    onConfirm: () => void,
}

const Popup = memo(forwardRef((props: Props, ref) => {
    const [state, setState] = useState({ open: false, name: '', data: '', title: '' });
    const [actions, setActions] = useState<any>({
        cbConfirm: null, cbCancel: null, cbClose: null
    })
    useImperativeHandle(ref, () => ({
        show
    }))

    const show = (name: string, data: any, cbConfirm: () => void, cbCancel: () => void, cbClose: () => void, title: string) => {
        setState({ open: true, name, data, title });
        setActions({ cbConfirm, cbCancel, cbClose });
    };

    const onClose = () => {
        setState({ ...state, open: false });
        if (actions.cbClose) actions.cbClose();
    };

    const onCancel = () => {
        setState({ ...state, open: false });
        if (actions.cbCancel) actions.cbCancel();
    };

    const onConfirm = () => {
        setState({ ...state, open: false });
        if (actions.cbConfirm) actions.cbConfirm();
    };

    const { open, data, name, title } = state;
    const _title = title ?? (name === "YES_NO" ? "Xác nhận" : "Thông báo");
    return (
        <div>
            <Dialog
                open={open}
                fullWidth
                PaperProps={{
                    style: styles.paper
                }}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Slide}
                className="popup-ask"
            >
                <DialogTitle >
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>{_title}</Typography>
                    <IconButton aria-label="close" onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description">
                        {data}
                    </DialogContentText>
                </DialogContent>
                <PopupAction type={name} onClose={onClose} onCancel={onCancel} onConfirm={onConfirm} />
            </Dialog>
        </div>
    );
}))

const PopupAction = (props: Props) => {

    const handleClose = () => {
        if (props.onClose) props.onClose();
    };

    const handleCancel = () => {
        if (props.onCancel) props.onCancel();
    };

    const handleConfirm = () => {
        if (props.onConfirm) props.onConfirm();
    };

    const type = props.type ? props.type : "INFO";

    return (
        <React.Fragment>
            {type === 'INFO' && <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained"
                    style={{ backgroundColor: '#0184e0', color: 'white' }}>
                    OK
                </Button>
            </DialogActions>}

            {type === 'YES_NO' && <DialogActions>
                <Button
                    onClick={handleCancel}
                    size={'small'}
                    variant="contained"
                >
                    {Config.lang("Huy")}
                </Button>
                <Button
                    onClick={handleConfirm}
                    size={'small'}
                    variant="contained"
                    style={{ backgroundColor: '#0184e0', color: 'white' }}
                >
                    {Config.lang("Xac_nhan")}
                </Button>
            </DialogActions>}
        </React.Fragment>
    );
}

export default Popup;
