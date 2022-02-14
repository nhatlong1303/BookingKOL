import React from 'react';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
const useStyle = makeStyles((theme: any) => ({
    title: {
        color: theme.palette.common.Ink.Dark,
        fontSize: 20,
        fontWeight: 500,
        paddingTop: 20,
        paddingBottom: 10
    },
    kols: {
        '& .info': {
            color: theme.palette.common.Ink.Dark,
        },
        '& .address': {
            color: theme.palette.common.Ink.Gray,
        }
    },
    copyRight: {
        color: theme.palette.common.Ink.Gray,
        fontSize: 12,
        marginBottom: 32
    }
}))
const MainRight = () => {
    const classes = useStyle();
    return (
        <div className='main-right'>
            <div>
                <Image src={'/images/become-KOL.png'} priority alt='' width={272} height={330} />
            </div>
            <div className={classes.title}>KOL mới nhất</div>
            <div className={`list-kols ${classes.kols}`}>
                <div className='item-kol'>
                    <div className='avatar'> </div>
                    <div className='info'>
                        <span className='username'>Hoàng Thùy Linh</span>
                        <span className='address'>Hà Nội</span>
                    </div>
                </div>
                <div className='item-kol'>
                    <div className='avatar'> </div>
                    <div className='info'>
                        <span className='username'>Hoàng Thùy Linh</span>
                        <span className='address'>Hà Nội</span>
                    </div>
                </div>
                <div className='item-kol'>
                    <div className='avatar'> </div>
                    <div className='info'>
                        <span className='username'>Hoàng Thùy Linh</span>
                        <span className='address'>Hà Nội</span>
                    </div>
                </div>
                <div className='item-kol'>
                    <div className='avatar'> </div>
                    <div className='info'>
                        <span className='username'>Hoàng Thùy Linh</span>
                        <span className='address'>Hà Nội</span>
                    </div>
                </div>

            </div>
            <div style={{ marginBottom: 32 }}>
                <Image src={'/images/bannerads.png'} priority alt='' width={272} height={281} />
            </div>
            <div className={classes.copyRight}>2021 • Bản quyền thuộc về Booking KOL</div>
        </div>
    );
};

export default MainRight;