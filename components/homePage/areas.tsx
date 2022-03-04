import React, { useEffect, useContext, useState } from 'react';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import InlineSVG from "react-inlinesvg";
import { useRef } from 'react';

const useStyle = makeStyles((theme: any) => ({
    areas: {
        marginBottom: 32,
        '& .react-horizontal-scrolling-menu--item': {
            '& .actived': {
                backgroundColor: theme.palette.common.Brand.Orange,
                color: theme.palette.common.Neutral.White,
                border: '1px solid transparent !important'
            },
            '&:first-of-type .cate': {
                marginLeft: '0 !important'
            },
            '&:last-of-type .cate': {
                marginRight: '0 !important'
            }
        },
        '& .cate': {
            color: theme.palette.common.Ink.Gray,
            border: '1px solid' + theme.palette.common.Ink.Cement,
            borderRadius: 24,
            fontSize: 14,
            padding: '0 16px',
            whiteSpace: 'nowrap',
            height: 48,
            cursor: 'pointer',
            margin: '0 5px',
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down("sm")]: {
                fontSize: 12,
                height: 40,
            },

        }
    }
}))

interface Props {
    onFilterAreasOfConcern: (id: any) => void
}
const Areas = (props: Props) => {
    const { onFilterAreasOfConcern } = props;
    const classes = useStyle();
    const areasOfConcern = useSelector((state: any) => state?.setting?.areasOfConcern);
    const [actived, setActived] = useState('');
    const itemId = useRef('all');

    useEffect(() => {
        onRisze();
        window.addEventListener('resize', onRisze);
        return () => {
            window.removeEventListener('resize', onRisze);
        }
        /* eslint-disable */
    }, [])


    const onRisze = () => {
        const wraper = document.querySelector<HTMLElement>('.areas');
        const slide = document.querySelector<HTMLElement>('.slider');
        const widthRight = document.querySelector<HTMLElement>('.main-right')?.clientWidth;
        const widthMain = document.querySelector<HTMLElement>('.main')?.clientWidth;
        if (wraper && widthMain && widthRight) {
            wraper.style.width = (widthMain - (widthMain < 580 ? 22 : widthRight) - 80) + 'px' ?? '100%';
        }
        if (slide && widthMain && widthRight) {
            slide.style.width = (widthMain - widthRight - 80) + 'px' ?? '100%';
        }
    }

    const onSelected = (id: any, _itemId: string) => {
        if (id === actived) return;
        setActived(id);
        itemId.current = _itemId;
        onFilterAreasOfConcern(id);
    }

    return (
        <div className="areas">
            <ScrollMenu
                LeftArrow={() => LeftArrow(itemId.current)}
                RightArrow={() => RightArrow(itemId.current)}
                wrapperClassName={classes.areas}
            >
                <Card title='Tất cả' actived={actived === ''} itemId='all' id="" onClick={onSelected} />
                {areasOfConcern.map((rs: any, i: number) => (
                    <Card key={i} title={rs.name} id={rs._id} itemId={String(i)} actived={actived === rs._id} onClick={onSelected} />
                ))}
            </ScrollMenu>
        </div>
    );
};

const Card = ({ title, itemId, onClick, actived, id }: { title: string; itemId: string, onClick: (id: string, itemId: string) => void, actived: boolean, id: any }) => {
    // const visibility = useContext(VisibilityContext);
    // const visible = visibility.isItemVisible(itemId);
    return (
        <div className={`cate ${actived ? 'actived' : ''}`} onClick={() => onClick(id, itemId)}>{title}</div>
    )
}

const LeftArrow = (itemId: string) => {
    const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete, getItemById } = useContext(VisibilityContext);
    const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));
    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);
    const _visible = getItemById(itemId)?.visible;
    return (
        !disabled && <div className={`nav-pre ${!_visible ? 'unvisible' : ''}`} onClick={() => scrollPrev()} > <InlineSVG src={'/icons/ArrowRight.svg'} /></div>
    )
}

const RightArrow = (itemId: string) => {
    const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators, getItemById } = useContext(VisibilityContext);
    const [disabled, setDisabled] = useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);

    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);
    const _visible = getItemById(itemId)?.visible;
    return (
        !disabled && <div onClick={() => scrollNext()} className={`nav-next ${!_visible ? 'unvisible' : ''}`}><InlineSVG src={'/icons/ArrowRight.svg'} /></div>
    )
}

export default Areas;