import React, { memo, forwardRef, useState, useImperativeHandle, useRef } from "react";
import { Popover, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyle = makeStyles((theme: any) => ({
    root: {

    },
}))

interface Props {
    children: any,
    anchorOrigin: any,
    transformOrigin: any,
    isCenter?: boolean
}
const PopoverActions = ((props: Props, ref: any) => {
    const classes = useStyle();
    const { children, anchorOrigin, transformOrigin, isCenter } = props;
    const [open, setOpen] = useState(false);
    const target = useRef(null);
    const [data, setData] = useState(null);

    useImperativeHandle(ref, () => ({
        show, hide, data
    }))

    const show = (el: any, item: any) => {
        setOpen(true);
        target.current = el;
        setData(item)
    }

    const hide = () => {
        setOpen(false);
    }
    const _anchorOrigin = anchorOrigin ? anchorOrigin : {
        vertical: 'bottom',
        horizontal: 'center',
    }
    const _transformOrigin = transformOrigin ? transformOrigin : {
        vertical: 'top',
        horizontal: 'left',
    }

    return (
        <Popover
            open={open}
            onClose={hide}
            className={`${classes.root}`}
            anchorEl={target.current}
            anchorOrigin={_anchorOrigin}
            transformOrigin={_transformOrigin}
            PaperProps={{
                style: {
                    backgroundColor: "transparent",
                    // boxShadow: "none",
                    // borderRadius: 0
                }
            }}
        >
            <div className="popover-actions">
                <Box
                    sx={{
                        position: "relative",
                        mt: "10px",
                        "&::before": {
                            backgroundColor: "white",
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: 12,
                            height: 12,
                            top: -6,
                            transform: "rotate(45deg)",
                            left: `calc(${isCenter ? '50%' : '80%'} - 6px)`
                        }
                    }}
                />
                {children}
            </div>
        </Popover>
    );
});


export default memo(forwardRef(PopoverActions));