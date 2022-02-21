import React, { useEffect, useContext, useState } from 'react';
import Image from 'next/image';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const useStyle = makeStyles((theme: any) => ({
    category: {
        marginBottom: 32,
        display: 'flex',
        '& .react-horizontal-scrolling-menu--item': {
            '&:first-of-type .cate': {
                backgroundColor: theme.palette.common.Brand.Orange,
                color: theme.palette.common.Neutral.White,
                marginLeft: '0 !important',
                border: 'none !important'
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
            padding: '14px 16px',
            whiteSpace: 'nowrap',
            height: 48,
            cursor: 'pointer',
            margin: '0 5px',

        }
    }
}))

const Category = () => {
    const classes = useStyle();
    const areasOfConcern = useSelector((state: any) => state?.setting?.areasOfConcern);

    useEffect(() => {
        const wraper = document.querySelector<HTMLElement>('.categories');
        if (wraper) {
            wraper.style.maxWidth = document.querySelector<HTMLElement>('.slider')?.clientWidth + 'px' ?? '100%'
        }
        window.addEventListener('resize', onRisze);
        return () => {
            window.removeEventListener('resize', onRisze);
        }
    }, [])

    const onRisze = () => {
        const wraper = document.querySelector<HTMLElement>('.categories');
        const widthRight = document.querySelector<HTMLElement>('.main-right')?.clientWidth;
        const widthMain = document.querySelector<HTMLElement>('.main')?.clientWidth;
        if (wraper && widthMain && widthRight) {
            wraper.style.maxWidth = (widthMain - widthRight - 80) + 'px' ?? '100%';
        }
    }
    return (
        <div className="categories">
            <ScrollMenu
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
                wrapperClassName={classes.category}
                onWheel={onWheel}
            >
                <Card title='Tất cả' itemId='all' />
                {areasOfConcern.map((rs:any, i:number) => (
                    <Card key={i} title={rs.name} itemId={String(i)} />
                ))}
            </ScrollMenu>
        </div>
    );
};

const Card = ({ title, itemId }: { title: string; itemId: string }) => {
    const visibility = useContext(VisibilityContext);
    const visible = visibility.isItemVisible(itemId);
    return (
        <div className='cate'>{title}</div>
    )
}

const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } = useContext(VisibilityContext);
    const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));
    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

    return (
        !disabled && <div className="nav-pre" onClick={() => scrollPrev()} > <Image src={'/icons/ArrowRight.svg'} priority alt='' width={24} height={24} /></div>
    )
}

const RightArrow = () => {
    const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators, } = useContext(VisibilityContext);
    const [disabled, setDisabled] = useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);

    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);

    return (
        !disabled && <div onClick={() => scrollNext()} className="nav-next" ><Image src={'/icons/ArrowRight.svg'} priority alt='' width={24} height={24} /></div>
    )
}


function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
        ev.stopPropagation();
        return;
    }

    if (ev.deltaY < 0) {
        apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
        apiObj.scrollPrev();
    }
}

export default Category;