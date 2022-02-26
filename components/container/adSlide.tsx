import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
const GoogleAd = dynamic(() => import("../common/googleAd/googleAd"), {
    ssr: false,
});
const AdSlide = () => {

    useEffect(() => {
        onRisze();
        window.addEventListener('resize', onRisze);
        return () => {
            window.removeEventListener('resize', onRisze);
        }
    }, [])


    const onRisze = () => {
        const wraper = document.querySelector<HTMLElement>('.slider');
        const widthRight = document.querySelector<HTMLElement>('.main-right')?.clientWidth;
        const widthMain = document.querySelector<HTMLElement>('.main')?.clientWidth;
        if (wraper && widthMain && widthRight) {
            wraper.style.maxWidth = (widthMain - widthRight - 80) + 'px' ?? '100%';
        }
    }

    return (
        <div className="slider" aria-hidden={true} >
            <GoogleAd />
            {/* <Image src={'/images/sliderads.png'} priority alt='' width={896} height={239} /> */}
        </div>
    );
};

export default AdSlide;