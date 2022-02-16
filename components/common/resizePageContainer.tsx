import React, { useEffect, useState } from 'react';
import { ResizeContext } from './context/context';
interface Props {
    children: any
}
const ResizePageContainer = (props: Props) => {
    const { children } = props;
    const [deviceSize, setDeviceSize] = useState('lg');

    const handleResize = () => {
        const resize = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        let size = 'xl'
        switch (true) {
            case window.innerWidth >= 1536:
                size = 'xl';
                break;
            case window.innerWidth >= 1200:
                size = 'lg';
                break;
            case window.innerWidth >= 900:
                size = 'md';
                break;
            case window.innerWidth >= 600:
                size = 'sm';
                break;
            case window.innerWidth > 0:
                size = 'xs';
                break;
            default:
                size = 'xl';
                break;
        }
        setDeviceSize(size);
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize)
        }
        /* eslint-disable */
    }, [])
    return (
        <ResizeContext.Provider value={deviceSize}>
            {children}
        </ResizeContext.Provider>
    );
};

export default ResizePageContainer;
