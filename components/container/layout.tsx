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
import { useRouter } from 'next/router';

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
            '& .main-right': {
                position: 'relative',
            },
        },
        '& .form-hook': {
            margin: 'auto',
            '& .text-field': {
                marginBottom: 16,
                backgroundColor: theme.palette.common.Neutral.Smoke,
                '&:focus': {
                    border: '1px solid' + theme.palette.common.Brand.Orange,
                },
                '& .MuiInputLabel-formControl': {
                    color: theme.palette.common.Brand.Orange,
                    fontSize: 12
                },
                '& .MuiFormHelperText-root': {
                    position: 'absolute',
                    bottom: -22,
                    color: theme.palette.common.Denotative.Error
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.common.Brand.Orange + ' !important',
                    },
                },
            },
            '& .btn-custom-kol': {
                marginTop: 28,
                background: theme.palette.common.Brand.Orange + '!important',
                width: '100%',
                color: '#fff'
            },
        }
    }
}))

interface Props {
    children: any
}
const Layout = (props: Props) => {
    const { children } = props;
    const router = useRouter();
    const loading = useSelector((state: any) => state?.setting?.loading);
    const dispatch = useDispatch();
    const classes = useStyle();
    const [mount, setMount] = useState(false);
    const [tab, setTab] = useState('/');
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setMount(true);
        dispatch(SettingActions.getSetting());
        const routes = ['statistical', 'posts', 'contact', '/'];
        const path = routes.find(rs => router.asPath.indexOf(rs) !== -1)
        setTab(path ?? '/');
        router.events.on("routeChangeStart", url => {
            const route = routes.find(rs => url.indexOf(rs) !== -1);
            setTab(route ?? '/');
        });
        /* eslint-disable */
    }, [])

    const login = () => {
        setFlag(!flag);
    }

    const onLogout = () => {
        dispatch(SettingActions.onLogout(null, () => {
            setFlag(!flag);
        }));
    }

    const onChangeTab = (path: string) => {
        if (path === tab) return false;
        setTab(path);
        router.push(`/${path}`);
    }
    const forgotPassword = router.pathname = '/forgotPassword';
    if (loading) return null;
    
    return (
        <div id='layout' className={classes.root}>
            <Header login={login} onChangeTab={onChangeTab} tab={tab} onLogout={onLogout} />
            <div className='main'>
                {Config.profile && !Config.profile?.fullName ?
                    <UpdateInfo />
                    :
                    forgotPassword ? children : <>
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