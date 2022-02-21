import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Header from './header';
import MainRight from './mainRight';
import Image from 'next/image';
import ButtonToTop from './buttonToTop';
import * as SettingActions from '../../redux/setting/setting_actions';
import { useDispatch, useSelector } from 'react-redux';
import UpdateInfo from '../homePage/updateInfo';
import Config from '../../config/index';

const useStyle = makeStyles((theme: any) => ({
    root: {
        '& .main': {
            marginTop: '80px !important',
            paddingTop: 32,
            display: 'flex',
            justifyContent: 'space-between',
            '& .main-page': {
                marginRight: 32
            },
            [theme.breakpoints.up("lg")]: {
                paddingLeft: 120,
                paddingRight: 120,
                maxWidth: 1440,
                margin: 'auto'
            },
            [theme.breakpoints.down("lg")]: {
                paddingLeft: 24,
                paddingRight: 24
            },
            [theme.breakpoints.down("md")]: {
                marginTop: '50px !important',
            },
            // '& .main-right': {
            //     [theme.breakpoints.up("lg")]: {
            //         paddingRight: 120
            //     },
            // }
        },
    }
}))

interface Props {
    children: any
}
const Layout = (props: Props) => {
    const { children } = props;
    const loading = useSelector((state: any) => state?.setting?.loading);
    const dispatch = useDispatch();
    const classes = useStyle();
    const [mount, setMount] = useState(false);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setMount(true);
        dispatch(SettingActions.getSetting());
        /* eslint-disable */
    }, [])

    const login = () => {
        setFlag(!flag);
    }
    if (loading) return null;
    return (
        <div id='layout' className={classes.root}>
            <Header login={login} />
            <div className='main'>
                {Config.profile && !Config.profile?.fullName ?
                    <UpdateInfo />
                    : <>
                        <div className='main-page'>
                            <div className='slider' style={{ width: 'fit-content' }}>
                                <Image src={'/images/sliderads.png'} priority alt='' width={896} height={239} />
                            </div>
                            {mount ? children : null}
                        </div>
                        <MainRight />
                    </>
                }
            </div>
            <ButtonToTop />
        </div>
    );
};

export default Layout;