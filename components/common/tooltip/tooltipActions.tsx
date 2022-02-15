import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const Default = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        marginTop: '5px !important',
    },
}));

const Arrow = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        marginTop: '5px !important',
    },
}));

const Html = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff',
        color: '#000',
        fontWeight: 'normal',
        fontSize: theme.typography.pxToRem(14),
        border: '1px solid #dadde9',
    },
}));
interface Props {
    children: any,
    title: any,
    viewType?: 'Default' | 'Arrow' | 'Html',
}
const ToolTipActions = (props: Props) => {
    const { children, title, viewType = 'Default' } = props;
    switch (viewType) {
        case 'Arrow':
            return <Arrow title={title}><div>{children}</div></Arrow>;
        case 'Html':
            return <Html title={title}><div>{children}</div></Html>;
        default:
            return <Default title={title}><div>{children}</div></Default>;
    }

}

export default ToolTipActions;