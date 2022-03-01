import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { TextField, InputAdornment, IconButton, Button, Drawer } from '@mui/material';
import Config from '../../config/index';
import { Menu, Close } from '@mui/icons-material';
import Auth from '../auth/auth';
import PopoverActions from '../common/popover/popoverActions';

const useStyle = makeStyles((theme: any) => ({
    header: {
        height: 80,
        position: 'fixed',
        top: 0,
        boxShadow: '0px 4px 8px rgba(158, 158, 158, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 32,
        width: '100%',
        backgroundColor: theme.palette.common.Neutral.White,
        '& .logo-app': {
            display: 'flex',
            cursor: 'pointer',
        },
        '& .search': {
            backgroundColor: theme.palette.common.Neutral.Smoke
        },
        '& .menu': {
            '& li': {
                color: theme.palette.common.Ink.Gray,
                '&::before': {
                    backgroundColor: theme.palette.common.Brand.Orange
                },
                '&:hover': {
                    color: theme.palette.common.Ink.Dark
                }
            }
        },
        '& .btn-download': {
            color: theme.palette.common.Brand.Orange,
            marginRight: 10
        },
        '& .btn-login': {
            backgroundColor: theme.palette.common.Brand.Orange + '!important',
            color: theme.palette.common.Neutral.White,
            marginLeft: 10
        },
        '& .menu .actived': {
            fontWeight: 500,
            color: theme.palette.common.Ink.Dark,
            '&::before': {
                backgroundColor: theme.palette.common.Brand.Orange,
                transform: 'scale(1)'
            },
        },
        [theme.breakpoints.down("lg")]: {
            '& .search': {
                width: 200
            }
        },
        [theme.breakpoints.down("md")]: {
            height: 60,
            paddingRight: 10,
            '& .menu-desktop, .btn-header ': {
                display: 'none !important',
            },
        },
        [theme.breakpoints.up("md")]: {
            '& .btn-toggle ': {
                display: 'none',
            }
        },
        [theme.breakpoints.between("md", "lg")]: {
            fontSize: 14,
        },
    },
    drawer: {
        '& .menu .actived': {
            fontWeight: 500,
            color: theme.palette.common.Ink.Dark,
        },
        [theme.breakpoints.up("md")]: {
            display: 'none',
        },
        [theme.breakpoints.down("md")]: {
            '& .menu-mobile': {
                display: 'block',
            },
            '& .btn-download': {
                color: theme.palette.common.Brand.Orange,
                margin: 10
            },
            '& .btn-login': {
                backgroundColor: theme.palette.common.Brand.Orange,
                color: theme.palette.common.Neutral.White,
                margin: 10
            },
        },
        '& .column': {
            marginBottom: 20
        }
    },
    download: {
        borderRight: '1px solid ' + theme.palette.common.Neutral.Smoke,
    },
    profile: {
        minWidth: 200,
        padding: 10,
        display: 'flex',
        justifyContent: 'center'
    }
}))

interface Props {
    onChangeTab: (e: string) => void,
    tab: string,
    onLogout: () => void,
    profile: any
}

const Header = (props: Props) => {
    const classes = useStyle();
    const { onChangeTab, tab, onLogout, profile } = props;
    const profileRef = useRef<any>(null);
    const [open, setOpen] = useState(false);
    const [showModalAuth, setShowModalAuth] = useState(false);
    const router = useRouter();
    const onToggle = () => {
        setOpen(!open);
    }

    useEffect(() => {
        setOpen(false);
    }, [router])

    const onShowModalAuth = () => {
        setShowModalAuth(!showModalAuth)
    }

    const onClose = (boolean = false) => {
        onShowModalAuth();
    }

    const _onLogout = () => {
        if (profileRef.current) profileRef.current.hide();
        onLogout();
    }

    const onOpenProfile = (e: any) => {
        const target = e.currentTarget;
        if (profileRef.current) profileRef.current.show(target);
    }
    return (
        <div className={`header ${classes.header}`}>
            <div className="center-row">
                <div className='logo-app' onClick={() => router.push('/')}>
                    <Image src={'/logo.png'} priority alt='' width={250} height={80} />
                </div>
                <TextField
                    placeholder={Config.lang('Nhập tên của KOL')}
                    variant="outlined"
                    className={'search'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                                <IconButton size='small' >
                                    <Image src={'/icons/Search.svg'} priority alt='' width={24} height={24} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <ul className='menu menu-desktop'>
                <li className={tab === '/' ? 'actived' : ''} onClick={() => onChangeTab('')} >Trang chủ</li>
                <li className={tab === 'statistical' ? 'actived' : ''} onClick={() => onChangeTab('statistical')}>Thống kê</li>
                <li className={tab === 'posts' ? 'actived' : ''} onClick={() => onChangeTab('posts')}>Tin tức</li>
                <li className={tab === 'contact' ? 'actived' : ''} onClick={() => onChangeTab('contact')}>Liên hệ</li>
            </ul>
            <Drawer
                anchor={'left'}
                open={open}
                className={`drawer-navbar ${classes.drawer}`}
                onClose={() => setOpen(false)}
            >
                <div>
                    <div style={{ boxShadow: '0px 4px 8px rgba(158, 158, 158, 0.08)' }}>
                        <div className='logo-app' style={{ display: 'flex' }} onClick={() => router.push('/')}>
                            <Image src={'/logo.png'} priority alt='' width={200} height={60} />
                        </div>
                    </div>
                    <ul className='menu menu-mobile'>
                        <li className={tab === '/' ? 'actived' : ''} onClick={() => onChangeTab('')} >Trang chủ</li>
                        <li className={tab === 'statistical' ? 'actived' : ''} onClick={() => onChangeTab('statistical')}>Thống kê</li>
                        <li className={tab === 'posts' ? 'actived' : ''} onClick={() => onChangeTab('posts')}>Tin tức</li>
                        <li className={tab === 'contact' ? 'actived' : ''} onClick={() => onChangeTab('contact')}>Liên hệ</li>
                    </ul>
                </div>
                <div className='column'>
                    <Button variant="outlined" className='btn-custom-kol btn-download'
                        startIcon={<Image src={'/icons/Download.svg'} priority alt='' width={24} height={24} />}>
                        Tải ứng dụng
                    </Button>
                    {!profile ?
                        <Button variant="outlined" className='btn-custom-kol btn-login' onClick={onShowModalAuth}>
                            Đăng nhập
                        </Button>
                        : <div className="center-row" style={{ justifyContent: 'space-between', padding: '0 10px' }}>
                            <div className="center-row">
                                <div className='avatar'>
                                    <Image src={Config.getImage(profile?.profile?.imgPortrait) ?? '/images/avatar_default.svg'} priority alt='' width={48} height={48} onClick={onOpenProfile} />
                                </div>
                                <label style={{ fontWeight: 500, paddingLeft: 20 }}>{profile?.profile?.fullName}</label>
                            </div>
                            <Button variant="outlined" className='btn-custom-kol' onClick={_onLogout}>
                                Đăng xuất
                            </Button>
                        </div>
                    }
                </div>
            </Drawer>
            <IconButton size='small' onClick={onToggle} className="btn-toggle" style={{ marginLeft: 10 }}>
                {open ? <Close /> : <Menu />}
            </IconButton>
            <div className="btn-header" style={{ display: 'flex', alignItems: 'center' }}>
                <div className={classes.download}>
                    <Button variant="outlined" className='btn-custom-kol btn-download'
                        startIcon={<Image src={'/icons/Download.svg'} priority alt='' width={24} height={24} />}>
                        Tải ứng dụng
                    </Button></div>
                {!profile ?
                    <Button variant="outlined" className='btn-custom-kol btn-login' onClick={onShowModalAuth}>
                        Đăng nhập
                    </Button>
                    :
                    <div className='avatar mgl10'>
                        <Image src={Config.getImage(profile?.profile?.imgPortrait) ?? '/images/avatar_default.svg'} priority alt='' width={48} height={48} onClick={onOpenProfile} />
                    </div>
                }
                {showModalAuth && <Auth onClose={onClose} />}
                <PopoverActions
                    ref={profileRef}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <div className={classes.profile} >
                        <Button variant="outlined" className='btn-custom-kol' onClick={_onLogout}>
                            Đăng xuất
                        </Button>
                    </div>
                </PopoverActions>
            </div>
        </div >
    );
};

export default Header;