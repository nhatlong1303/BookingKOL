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
    display: 'flex',
    overflow: 'hidden',
    '& .nav': {
      color: theme.palette.common.Ink.Gray,
      border: '1px solid' + theme.palette.common.Ink.Cement,
      borderRadius: 24,
      fontSize: 14,
      padding: '14px 16px',
      whiteSpace: 'nowrap',
      height: 48,
      cursor: 'pointer',
      margin: '0 5px',
      '&:first-of-type': {
        backgroundColor: theme.palette.common.Brand.Orange,
        color: theme.palette.common.Neutral.White,
        marginLeft: '0 !important',
        border: 'none !important'
      },
      '&:last-of-type': {
        marginRight: '0 !important'
      }
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

  // var scrollDuration = 300;
  // var leftPaddle = document.getElementsByClassName('left-paddle');
  // var rightPaddle = document.getElementsByClassName('right-paddle');
  // // get items dimensions
  // var itemsLength = $('.item').length;
  // var itemSize = $('.item').outerWidth(true);
  // // get some relevant size for the paddle triggering point
  // var paddleMargin = 20;

  // // get wrapper width
  // var getMenuWrapperSize = function () {
  //   return $('.menu-wrapper').outerWidth();
  // }
  // var menuWrapperSize = getMenuWrapperSize();
  // // the wrapper is responsive
  // $(window).on('resize', function () {
  //   menuWrapperSize = getMenuWrapperSize();
  // });
  // // size of the visible part of the menu is equal as the wrapper size 
  // var menuVisibleSize = menuWrapperSize;

  // // get total width of all menu items
  // var getMenuSize = function () {
  //   return itemsLength * itemSize;
  // };
  // var menuSize = getMenuSize();
  // // get how much of menu is invisible
  // var menuInvisibleSize = menuSize - menuWrapperSize;

  // // get how much have we scrolled to the left
  // var getMenuPosition = function () {
  //   return $('.menu').scrollLeft();
  // };

  // // finally, what happens when we are actually scrolling the menu
  // $('.menu').on('scroll', function () {

  //   // get how much of menu is invisible
  //   menuInvisibleSize = menuSize - menuWrapperSize;
  //   // get how much have we scrolled so far
  //   var menuPosition = getMenuPosition();

  //   var menuEndOffset = menuInvisibleSize - paddleMargin;

  //   // show & hide the paddles 
  //   // depending on scroll position
  //   if (menuPosition <= paddleMargin) {
  //     $(leftPaddle).addClass('hidden');
  //     $(rightPaddle).removeClass('hidden');
  //   } else if (menuPosition < menuEndOffset) {
  //     // show both paddles in the middle
  //     $(leftPaddle).removeClass('hidden');
  //     $(rightPaddle).removeClass('hidden');
  //   } else if (menuPosition >= menuEndOffset) {
  //     $(leftPaddle).removeClass('hidden');
  //     $(rightPaddle).addClass('hidden');
  //   }

  //   // print important values
  //   $('#print-wrapper-size span').text(menuWrapperSize);
  //   $('#print-menu-size span').text(menuSize);
  //   $('#print-menu-invisible-size span').text(menuInvisibleSize);
  //   $('#print-menu-position span').text(menuPosition);

  // });

  // // scroll to left
  // $(rightPaddle).on('click', function () {
  //   $('.menu').animate({ scrollLeft: menuInvisibleSize }, scrollDuration);
  // });

  // // scroll to right
  // $(leftPaddle).on('click', function () {
  //   $('.menu').animate({ scrollLeft: '0' }, scrollDuration);
  // });



  const width = document.querySelector('.slider')?.clientWidth ?? '100%';

  return (
    <div className={classes.HomePage} >
      <div className={classes.title}>Lĩnh vực</div>
      <button className="left-paddle paddle hidden">
        1
      </button>
      <div className={classes.nav} style={{ width: width }}>
        <div className='nav'>Tất cả</div>
        <div className='nav'>Mẫu ảnh</div>
        <div className='nav'>Streamer</div>
        <div className='nav'>PG sự kiện</div>
        <div className='nav'>Reviewer công nghệ</div>
        <div className='nav'>Youtuber</div>
        <div className='nav'>Gamer</div>
        <div className='nav'>Ca sĩ tự do</div>
        <div className='nav'>Mẫu ảnh</div>
        <div className='nav'>Streamer</div>
        <div className='nav'>PG sự kiện</div>
        <div className='nav'>Reviewer công nghệ</div>
        <div className='nav'>Youtuber</div>
        <div className='nav'>Gamer</div>
        <div className='nav'>Ca sĩ tự do</div>
      </div>
      <button className="right-paddle paddle">
        2
      </button>
    </div>
  );
};

export default Home
