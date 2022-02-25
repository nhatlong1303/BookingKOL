import React, { useEffect, memo } from 'react';
import { Button } from '@mui/material';
import Config from '../../config/index';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
const useStyle = makeStyles((theme: any) => ({
    button: {
        backgroundColor: theme.palette.common.Neutral.White,
        boxShadow: '0px 2px 16px rgba(158, 158, 158, 0.16)',
        borderRadius: 28,
        width: 'max-content',
        margin: 'auto',
        '& .btn-custom-kol': {
            border: 'none !important',
            color: theme.palette.common.Ink.Dark,
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
        const header = document.querySelector<HTMLElement>('.header');
        const el = document.querySelector<HTMLElement>('.scroll-to-top');
        if (e.target.scrollingElement.scrollTop > 80 && header && el) {
            const widthRight = document.querySelector<HTMLElement>('.main-page')?.clientWidth;
            const left = document.querySelector<HTMLElement>('.main-page')?.getBoundingClientRect().left;
            el?.classList.remove('hidden');
            if (el) {
                el.style.width = widthRight + 'px';
                el.style.left = left + 'px';
            }
        } else {
            el?.classList.add('hidden');
        }
    }

    return (
        <div className={`scroll-to-top hidden `}>
            <div className={classes.button}>
                <Button variant="outlined" className='btn-custom-kol ' onClick={() => Config.srollToTop()}
                    startIcon={<Image src={'/icons/arrowCircleTop.svg'} priority alt='' width={21} height={21} />}>
                    Lên trên cùng
                </Button>
            </div>
        </div>
    );
}
export default memo(ButtonToTop, (pre, next) => {
    return true;
})