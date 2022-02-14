import React, { useEffect, memo } from 'react';
import { Button } from '@mui/material';
import Config from '../../config/index';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
const useStyle = makeStyles((theme: any) => ({
    button: {
        color: theme.palette.common.Ink.Dark,
        backgroundColor: theme.palette.common.Neutral.White,
        '& .btn-custom-kol': {
            border: 'none !important'
        }
    },

}))
const ButtonToTop = () => {
    const classes = useStyle();
    useEffect(() => {
        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        }
        /* eslint-disable */
    }, [])

    const onScroll = (e: any) => {
        const header = document.querySelector('.header');
        if (e.target.scrollingElement.scrollTop > 80 && header) {
            document.querySelector('.scroll-to-top')?.classList.remove('hidden');
        } else {
            document.querySelector('.scroll-to-top')?.classList.add('hidden');
        }
    }

    return (
        <div className={`scroll-to-top hidden ${classes.button}`}>
            <Button variant="outlined" className='btn-custom-kol ' onClick={() => Config.srollToTop()}
                startIcon={<Image src={'/icons/arrowCircleTop.svg'} priority alt='' width={21} height={21} />}>
                Lên trên cùng
            </Button>
        </div>
    );
}
export default memo(ButtonToTop, (pre, next) => {
    return true;
})