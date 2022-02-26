import React, { useEffect } from 'react';
import Config from '../../../config/index';
export enum AdType {
    DEFAULT,
    ARTICLE,
    VERTICAL,
}
const adUnitProps: Record<AdType, any> = {
    [AdType.DEFAULT]: {
        'data-ad-slot': '7181773959',
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true',
    },
    [AdType.ARTICLE]: {
        'data-ad-slot': '3197857275',
        'data-ad-format': 'fluid',
        'data-ad-layout': 'in-article',
    },
    [AdType.VERTICAL]: {
        'data-ad-slot': '8863578035',
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true',
    },
};

interface GoogleAdProps {
    variant?: AdType;
}


const GoogleAd = ({ variant = AdType.DEFAULT }: GoogleAdProps) => {

    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={Config.env.adsense}
            {...adUnitProps[variant]}
        />
    );
};

export default GoogleAd;