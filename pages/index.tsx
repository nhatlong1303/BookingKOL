import React, { useEffect, useContext, useState, useRef } from 'react';
import type { NextPage, GetStaticProps } from 'next'
import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';
import { useThemeContext } from '../components/theme/ThemeContext';
import Image from 'next/image';
import Areas from '../components/homePage/areas';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as UsersActions from '../redux/user/user_actions';
import Config from '../config/index';
import { useRouter } from 'next/router';
import InlineSVG from "react-inlinesvg";
import ImageWithFallBack from '../components/common/imageWithFallBack/imageWithFallBack';
import Api from '../services/api';
// import GoogleAd from '../components/common/googleAd/googleAd';

const useStyle = makeStyles((theme: any) => ({
  HomePage: {
    position: 'relative',
    marginTop: 10,
  },
  title: {
    color: theme.palette.common.Ink.Dark,
    fontWeight: 500,
    [theme.breakpoints.up("md")]: {
      fontSize: 32,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 24,

    },
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
  cardKols: {
    '& .card': {
      height: 'auto',
      margin: '0 8px 16px 8px',
      '& .profile': {
        '&::before': {
          background: theme.palette.common.Gradient.Aurora,
        },
        '& label': {
          color: theme.palette.common.Neutral.White,
          [theme.breakpoints.down("md")]: {
            fontSize: 18
          },
        },
        '& span': {
          color: theme.palette.common.Neutral.White,
        },
        '& .btn-custom-kol': {
          color: theme.palette.common.Neutral.White,
          width: '100%',
          border: '1px solid ' + theme.palette.common.Neutral.White + ' !important',
          '&:hover': {
            backgroundColor: theme.palette.common.Neutral.White,
            color: theme.palette.common.Brand.Orange,
          }
        }
      },
      [theme.breakpoints.up("lg")]: {
        minHeight: 360,
      },
      [theme.breakpoints.down("lg")]: {
        minHeight: 320
      },
      [theme.breakpoints.up("md")]: {
        width: 'calc(100% / 3 - 11px)',
        '&:nth-child(3n+1)': {
          marginLeft: '0 !important',
        },
        '&:nth-child(3n+3)': {
          marginRight: '0 !important',
        },
      },
      [theme.breakpoints.down("md")]: {
        '& .cate': {
          margin: '10px 16px !important',
          padding: '0 !important',
          '& div': {
            padding: '5px !important',
          }
        },
        '& button': {
          height: 40
        },
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
const Home: NextPage = (props: any) => {
  // const { themeMode, toggleTheme } = useThemeContext();
  // const theme = useTheme();
  const { kols } = props;
  const classes = useStyle();
  const router = useRouter();
  const dispatch = useDispatch();
  const [users, setUsers] = useState(kols?.docs ?? []);
  const hasNextPage = useRef(kols?.hasNextPage ?? false);
  const filter = useRef({ limit: 8, page: 1, areasOfConcern: '' })
  const [loading, setLoading] = useState(false);
  const loadMore = useRef(false);

  // const onClick = () => {
  //   toggleTheme()
  // }

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    }
    /* eslint-disable */
  }, [users])

  const getUsers = (isReset: boolean) => {
    setLoading(true);
    dispatch(UsersActions.onFindUsers(filter.current, (error: any, data: any) => {
      if (error) {
        setLoading(false);
        loadMore.current = false;
        return;
      }
      hasNextPage.current = data.hasNextPage;
      loadMore.current = false;
      setLoading(false);
      const rand = Config.getRandomNumber(4, 10);
      data.docs.splice(rand, 0, { ads: true, index: rand });
      const _users = isReset ? data.docs : users.concat(data.docs);
      setUsers(_users);
    }))
  }

  const onReading = (id: any) => {
    router.push('/posts/' + id);
  }

  const onFilterAreasOfConcern = (id: any) => {
    filter.current.areasOfConcern = id;
    filter.current.page = 1;
    getUsers(true);
  }

  const onScroll = (e: any) => {
    if (document.scrollingElement?.scrollHeight !== undefined) {
      const loadmore = window.innerHeight + document.documentElement.scrollTop >= (document.scrollingElement?.scrollHeight - (document.scrollingElement?.scrollHeight / 4));
      if (loadmore && !loadMore.current && hasNextPage.current) {
        loadMore.current = true;
        filter.current.page = filter.current.page + 1;
        getUsers(false);
      }
    }
  }


  return (
    <div className={classes.HomePage} >
      <div className={classes.title}>Lĩnh vực</div>
      <Areas onFilterAreasOfConcern={onFilterAreasOfConcern} />
      {loading &&
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      }
      <div className={`${classes.cardKols} cardKols`} >
        {users.map((user: any, i: number) => (
          user?.ads ?
            <div className='card' key={i} >
              <Image src={'/images/bannerads.png'} priority alt='' width={272} height={281} />
              {/* <GoogleAd slot='2' format='fluid' layout='in-article' /> */}
            </div>
            :
            <div className='card' key={i} >
              <div className='avatar'>
                <ImageWithFallBack
                  src={Config.getImage(user?.profile?.imgPortrait)}
                  objectFit='cover'
                  width={288}
                  height={360}
                  blurDataURL={'/images/blur.png'}
                  placeholder="blur"
                  fallBackSrc='/images/no_image.png'
                  alt='Hiện là một trong những người có tầm ảnh hưởng trên cộng đồng mạng đang được các NETIZEN đặc biệt quan  tâm bởi sở hữu vẻ ngoài xinh đẹp tài năng...'
                />
              </div>
              <div className='profile column'>
                <div className='profile-main'>
                  <label>{user?.profile?.fullName}</label>
                  <span className="center-row pdb5"><InlineSVG src={'/icons/Location.svg'} width={20} height={20} />&nbsp;{user?.profile?.province}</span>
                  <span className="center-row"><InlineSVG src={'/icons/Money.svg'} width={20} height={20} />&nbsp;{Config.numberFormat(user?.rank?.price ?? 0)} đ</span>
                  <div className='profile-detail'>
                    <div className='cate'>
                      {user?.areasOfConcerns.map((item: any, idx: number) => (
                        idx <= 1 ?
                          <div key={idx} >{item.name}</div>
                          : idx === 2 ?
                            <div key={idx} >+{user?.areasOfConcerns.length - 2}</div>
                            : null
                      ))}
                    </div>
                    <span className='description'>Hiện là một trong những người có tầm ảnh hưởng trên cộng đồng mạng đang được các NETIZEN đặc biệt quan  tâm bởi sở hữu vẻ ngoài xinh đẹp tài năng...</span>
                    <div style={{ padding: '10px 16px' }}><Button variant="outlined" className='btn-custom-kol' onClick={() => onReading(user._id)} >Đọc tiếp</Button></div>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
      {loading && <div className="loader loading-more"></div>}
    </div>
  );
};

const getUsers = async () => {
  const data = await Api.get('/user/find-kol-web', { limit: 8, page: 1, areasOfConcern: '' });
  return data?.data ?? false;
}

export const getStaticProps: GetStaticProps = async () => {
  const kols = await getUsers();
  const rand = Config.getRandomNumber(4, 10);
  if (kols?.docs) {
    kols.docs.splice(rand, 0, { ads: true, index: rand });
  }
  const metaTags = { title: 'Booking Kol' };
  return {
    revalidate: 30, //timer refresh after updated data
    props: { metaTags, kols: kols }
  }
}

export default Home
