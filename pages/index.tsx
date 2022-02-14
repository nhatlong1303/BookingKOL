import type { NextPage } from 'next'
import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';
import { useThemeContext } from '../components/theme/ThemeContext';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

const useStyle = makeStyles((theme: any) => ({
  HomePage: {
    position: 'relative',

  },
  title: {
    color: theme.palette.common.Ink.Dark,
    fontSize: 32,
    fontWeight: 500
  },
  nav: {
    '& .nav': {
      color: theme.palette.common.Ink.Gray,
      border: '1px solid' + theme.palette.common.Ink.Cement,
      borderRadius: 24,
      fontSize: 14,
      padding: '14px 16px',
      whiteSpace: 'nowrap',
      height: 48,
      cursor: 'pointer',
      display: 'row',
      justifyContent: 'center',
    }
  }
}))
const Home: NextPage = (props) => {
  const { themeMode, toggleTheme } = useThemeContext()
  const theme = useTheme();
  const classes = useStyle();

  const onClick = () => {
    toggleTheme()
  }

  return (
    <div className={classes.HomePage} >
      <div className={classes.title}>Lĩnh vực</div>
      <Swiper
        slidesPerView={8}
        pagination={{
          clickable: true
        }}
        spaceBetween={10}
        navigation
        className={classes.nav}
      >
        <SwiperSlide > <div className='nav'>Tất cả</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Mẫu ảnh</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Streamer</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>PG sự kiện</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Reviewer công nghệ</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Youtuber</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Gamer</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Ca sĩ tự do</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Mẫu ảnh</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Streamer</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>PG sự kiện</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Reviewer công nghệ</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Youtuber</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Gamer</div> </SwiperSlide>
        <SwiperSlide > <div className='nav'>Ca sĩ tự do</div> </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home
