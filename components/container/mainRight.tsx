import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as UsersActions from '../../redux/user/user_actions';
import Config from '../../config/index';
import { useRouter } from 'next/router';
// import GoogleAd from '../common/googleAd/googleAd';

const useStyle = makeStyles((theme: any) => ({
    title: {
        color: theme.palette.common.Ink.Dark,
        fontSize: 20,
        fontWeight: 500,
        paddingTop: 20,
        paddingBottom: 10,
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        },
    },
    kols: {
        '& .info': {
            color: theme.palette.common.Ink.Dark,
        },
        '& .address': {
            color: theme.palette.common.Ink.Gray,
        },
        [theme.breakpoints.down("sm")]: {
            '& .item-kol': {
                padding: '0 5px !important',
                '& .info': {
                    display: 'none !important'
                },
                '& .avatar': {
                    margin: '0 !important',
                },
            }

        },
    },
    copyRight: {
        color: theme.palette.common.Ink.Gray,
        fontSize: 12,
        marginBottom: 32
    },
    adsRight: {
        [theme.breakpoints.up("sm")]: {
            minWidth: 250,
            minHeight: 250
        },
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        },
        borderRadius: 16,
        position: 'relative',
        '& img': {
            borderRadius: 16,
        },
        '& .column': {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            '& label': {
                background: theme.palette.common.Gradient.Aurora,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: 32,
                fontWeight: 500,
                [theme.breakpoints.down("lg")]: {
                    fontSize: 28,
                },
            },
            '& span': {
                fontSize: 14,
                fontWeight: 500,
                paddingBottom: 10,
                color: theme.palette.common.Ink.Dark,
            },
            '& button': {
                backgroundColor: theme.palette.common.Brand.Orange,
                color: theme.palette.common.Neutral.White,
                width: 'max-content',
                [theme.breakpoints.down("lg")]: {
                    height: 40,
                    width: '100%',
                    fontSize: 14,
                    padding: '0 10px !important',
                },
            }
        }
    }
}))
const MainRight = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getUsers();
        /* eslint-disable */
    }, [])

    const getUsers = () => {
        dispatch(UsersActions.onFindUsers({ limit: 10, page: 1 }, (error: any, data: any) => {
            if (error) {
                console.log(error)
                return;
            }
            setUsers(data.docs);
        }))
    }

    const onReading = (id: any) => {
        router.push('/posts/' + id);
    }


    return (
        <div className='main-right'>
            <div className={classes.adsRight}>
                <Image src={'/images/ads_right.png'} priority alt='' width={272} height={330} />
                <div className="column">
                    <label >Booking KOL</label>
                    <span>N???n t???ng gi??p KOL qu???ng b?? b???n th??n ?????n g???n h??n v???i kh??ch h??ng!</span>
                    <Button variant="outlined" className='btn-custom-kol' >
                        Tr??? th??nh KOL
                    </Button>
                </div>
            </div>
            <div className={classes.title}>KOL m???i nh???t</div>
            <div className={`list-kols ${classes.kols}`}>
                {users.map((user: any, i: number) => (
                    <div className='item-kol' key={i} onClick={() => onReading(user?._id)}>
                        <div className='avatar'>
                            <Image src={Config.getImage(user?.profile?.imgPortrait) ?? '/images/no_image.png'} priority alt='' width={49} height={49} />
                        </div>
                        <div className='info'>
                            <span className='username'>{user?.profile?.fullName}</span>
                            <span className='address'>{user?.profile?.province}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginBottom: 32 }}>
                {/* <GoogleAd slot='2' /> */}
                <Image src={'/images/bannerads.png'} priority alt='' width={272} height={281} />
            </div>
            <div className={classes.copyRight}>2021 ??? B???n quy???n thu???c v??? Booking KOL</div>
        </div>
    );
};

export default MainRight;