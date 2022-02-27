import React, { useEffect } from 'react';
import Config from '../../../config/index';
export enum AdType {
    DEFAULT,
    ARTICLE,
    VERTICAL,
}
const adUnitProps: Record<AdType, any> = {
    [AdType.DEFAULT]: {
        'data-ad-slot': '3661266124807971',
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true',
    },
    [AdType.ARTICLE]: {
        'data-ad-slot': '3661266124807971',
        'data-ad-format': 'fluid',
        'data-ad-layout': 'in-article',
    },
    [AdType.VERTICAL]: {
        'data-ad-slot': '3661266124807971',
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true',
    },
};

interface GoogleAdProps {
    variant?: AdType;
    className?: any
}


const GoogleAd = ({ variant = AdType.DEFAULT, className }: GoogleAdProps) => {

    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);
    if (Config.env.development === 'YES') return null;
    return (
        <ins
            className={`adsbygoogle ${className}`}
            style={{ display: 'block', textAlign: 'center', width: '100%' }}
            data-ad-client={Config.env.adsense}
            {...adUnitProps[variant]}
        />
    );
};

export default GoogleAd;