import React from 'react';
import { Box, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
let lazyLoaded = false;
interface Props {
    activeKey?: number,
    style?: any,
    className?: string,
    disableSwipe?: boolean,
    disableTranstion?: boolean,
    onChangeIndex?: () => void,
    lazyLoading?: boolean,
    children: React.ReactNode,
    direction?: any
}
function TabContent(props: Props) {
    const { className, activeKey, children, style, direction,
        disableSwipe = false,
        disableTranstion = false,
        lazyLoading = false
    } = props;
    lazyLoaded = lazyLoading;
    return (
        <SwipeableViews
            style={style}
            axis={typeof direction === "undefined" ? 'x' : direction}
            index={activeKey}
            disabled={disableSwipe}
            slideClassName={className}
            animateTransitions={!disableTranstion}
            slideStyle={{ overflow: 'hidden' }}
        >
            {children}
        </SwipeableViews>
    );
}

interface TabPanelProps {
    value?: number,
    index: number,
    other?: object,
    children: React.ReactNode
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {(value === index || !lazyLoaded) && <Box component={'div'}>{children}</Box>}
        </Typography>
    );
}
export {
    TabPanel,
    TabContent
}

export default TabContent;