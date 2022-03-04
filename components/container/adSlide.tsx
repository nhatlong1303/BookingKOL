import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// const GoogleAd = dynamic(() => import("../common/googleAd/googleAd"), {
//     ssr: false,
// });
const AdSlide = () => {
    return (
        // <GoogleAd className="slider" slot='2' format='fluid' layout='in-article' />
        <div className="slider" >
            <Image src={'/images/sliderads.png'} priority alt='' width={896} height={230} />
        </div>
    );
};

export default AdSlide;