import React from 'react';
import { Dialog, IconButton, DialogContent, DialogTitle, Slide, Divider, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import Back from '@mui/icons-material/KeyboardBackspace';
import { TransitionProps } from '@mui/material/transitions';

const useStyles = makeStyles((theme: any) => ({
    root: {

    },
    titleCenter: {
        justifyContent: 'center',
        '& .button-back': {
            position: 'absolute',
            left: 5
        },
        '& .button-close': {
            position: 'absolute',
            right: 5
        }
    },

}))
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    title: string,
    onClose: () => void,
    onBack?: any,
    open: boolean,
    width: 'lg' | 'md' | 'sm' | 'xl' | 'xs',
    disableEscapeKeyDown?: boolean,
    disableBackdropClick?: boolean,
    className?: any,
    titleCenter?: boolean,
    children?: any
}

const Modal = React.memo((props: Props) => {
    const { open, onClose, title, children,
        width = 'md',
        onBack = false,
        titleCenter = false,
        disableEscapeKeyDown = false,
        disableBackdropClick = true,
        className, ...propsModal
    } = props;
    const classes = useStyles();

    const _onClose = (event: any, reason: any) => {
        if (reason && reason == "backdropClick" && disableBackdropClick)
            return;
        onClose();
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={_onClose}
                {...propsModal}
                maxWidth={width}
                TransitionComponent={Transition}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                disableEscapeKeyDown={disableEscapeKeyDown}
                className={classes.root + ' ' + className}
            >
                {title && <DialogTitle className={classes.titleCenter}>
                    {onBack &&
                        <IconButton size={"small"} onClick={onBack} className="button-back">
                            <Back />
                        </IconButton>
                    }
                    <Typography className="bold" variant="h6"  >{title}</Typography>
                    <IconButton size={"small"} onClick={onClose} className="button-close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>}
                {!!title && <Divider />}
                <DialogContent >
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
})
Modal.displayName = 'Modal';
export default Modal;