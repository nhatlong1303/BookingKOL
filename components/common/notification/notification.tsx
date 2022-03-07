import React, { memo, forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseOutlined'
import { useTheme } from '@mui/material';

interface Option {
    vertical: 'top' | 'bottom',
    horizontal: 'center' | 'right' | 'left',
    time: number
}

interface Props {
}

interface Ref {
    show: (type: string, mess: string) => void,
    hide: () => void,
}

const Notify = memo(forwardRef<Ref, Props>((props, ref) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const message = useRef('');
    const type = useRef('success');
    const time = useRef(3000);
    const vertical = useRef<Option['vertical']>('bottom');
    const horizontal = useRef<Option['horizontal']>('right')
    const timer = useRef<any>(null);
    const [flag, setFlag] = useState(false);

    useImperativeHandle(ref, () => ({
        show, hide
    }));

    useEffect(() => {
        if (time.current === -1) return;
        timer.current = setTimeout(() => {
            setOpen(false);
        }, time.current);
        /* eslint-disable */
    }, [open, flag])

    const show = (_type: string, _message: string, option?: Option) => {
        vertical.current = option?.vertical ?? 'bottom';
        horizontal.current = option?.horizontal ?? 'right';
        time.current = option?.time ?? 3000;
        message.current = _message;
        type.current = _type;;
        clearTimeout(timer.current);
        setOpen(true);
        if (open) {
            setFlag(!flag);
        }
    }

    const hide = () => {
        setOpen(false);
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: vertical.current, horizontal: horizontal.current }}
            open={open}
            sx={{
                '& .SnackbarItem-primary': {
                    backgroundColor: theme.palette.primary.main,
                },
                '& .SnackbarItem-info': {
                    backgroundColor: theme.palette.info.main,
                },
                '& .SnackbarItem-success': {
                    backgroundColor: theme.palette.success.main,
                },
                '& .SnackbarItem-warning': {
                    backgroundColor: theme.palette.warning.main,
                },
                '& .SnackbarItem-error': {
                    backgroundColor: theme.palette.error.main,
                },
            }}
        >
            <SnackbarContent
                message={
                    <div>{message.current}</div>
                }
                className={'SnackbarItem-' + type.current}
                role={'alert'}
                action={[
                    <IconButton key="close" color="inherit" size="small" onClick={hide} >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}));
Notify.displayName = 'Notify';
export default Notify;