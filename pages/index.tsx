import React, { useEffect, useContext, useState } from 'react';
import type { NextPage } from 'next'
import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';
import { useThemeContext } from '../components/theme/ThemeContext';
import Image from 'next/image';
import Category from '../components/homePage/category';

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
    '& .react-horizontal-scrolling-menu--item': {
      '&:first-of-type .nav': {
        backgroundColor: theme.palette.common.Brand.Orange,
        color: theme.palette.common.Neutral.White,
        marginLeft: '0 !important',
        border: 'none !important'
      },
      '&:last-of-type .nav': {
        marginRight: '0 !important'
      }
    },
  },
  listKols: {
    '& .item': {
      height: 'auto',
      width: 'calc(100% / 3 - 11px)',
      margin: '0 8px 16px 8px',
      '&:nth-child(3n+1)': {
        marginLeft: '0 !important',
      },
      '&:nth-child(3n+3)': {
        marginRight: '0 !important',
      },
      '& .profile': {
        '& label': {
          color: theme.palette.common.Neutral.White,
        },
        '& span': {
          color: theme.palette.common.Neutral.White,
        }
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: 'calc(100% / 2 - 11px)',
        '&:nth-child(2n+1)': {
          marginLeft: '0 !important',
        },
        '&:nth-child(2n+2)': {
          marginRight: '0 !important',
        },
      },
      [theme.breakpoints.down("sm")]: {
        marginRight: 0,
        marginLeft: 0,
        width: '100%',
      },
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
      <Category />
      <div className={`${classes.listKols} listKols`}>
        {[0, 1, 2, 3].map(rs => (
          <div className='item' key={rs}>
            <div className='avatar'>
              <Image src={'/images/image.png'} objectFit='cover' alt='' width={288} height={360} />
            </div>
            <div className='profile column'>
              <label>Triệu Mẫn Di</label>
              <span className="center-row pdb5"><Image src={'/icons/Location.svg'} priority alt='' width={20} height={20} />&nbsp;Hồ Chí Minh</span>
              <span className="center-row"><Image src={'/icons/Money.svg'} priority alt='' width={20} height={20} />&nbsp;10.000.000đ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home
