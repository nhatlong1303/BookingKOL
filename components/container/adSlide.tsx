import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AdType } from '../common/googleAd/googleAd'
const GoogleAd = dynamic(() => import("../common/googleAd/googleAd"), {
    ssr: false,
});
const AdSlide = () => {
    return (
        <GoogleAd className="slider" variant={AdType.ARTICLE} />
    );
};

export default AdSlide;