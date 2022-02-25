import React, { useEffect, useContext, useState, useRef } from 'react';
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
            '& .actived': {
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
const Category = (props: Props) => {
    const { onFilterAreasOfConcern } = props;
    const classes = useStyle();
    const areasOfConcern = useSelector((state: any) => state?.setting?.areasOfConcern);
    const [actived, setActived] = useState('');

    useEffect(() => {
        onRisze();
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

    const onSelected = (id: any) => {
        if (id === actived) return;
        setActived(id);
        onFilterAreasOfConcern(id);
    }

    return (
        <div className="categories">
            <ScrollMenu
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
                wrapperClassName={classes.category}
                onWheel={onWheel}
            >
                <Card title='Tất cả' actived={actived === ''} itemId='all' id="" onClick={onSelected} />
                {areasOfConcern.map((rs: any, i: number) => (
                    <Card key={i} title={rs.name} id={rs._id} itemId={String(i)} actived={actived === rs._id} onClick={onSelected} />
                ))}
            </ScrollMenu>
        </div>
    );
};

const Card = ({ title, itemId, onClick, actived, id }: { title: string; itemId: string, onClick: (e: any) => void, actived: boolean, id: any }) => {
    const visibility = useContext(VisibilityContext);
    const visible = visibility.isItemVisible(itemId);
    return (
        <div className={`cate ${actived ? 'actived' : ''}`} onClick={() => onClick(id)}>{title}</div>
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