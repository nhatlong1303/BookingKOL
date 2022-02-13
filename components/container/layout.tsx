import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme: any) => ({
    root: {
        
    }
}))

interface Props {
    children: any
}
const Layout = (props: Props) => {
    const { children } = props;
    const classes = useStyle();
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
        /* eslint-disable */
    }, [])


    return (
        <div id='layout' className={classes.root}>
            <div className='main-page container-lg'>
                {mount ? children : null}
            </div>
        </div>
    );
};

export default Layout;