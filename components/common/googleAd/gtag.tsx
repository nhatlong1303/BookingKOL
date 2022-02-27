import Config from '../../../config/index';

declare global {
    interface Window {
        gtag: any;
    }
}

export const pageview = (url: string) => {
    window.gtag('config', Config.env.analytics, {
        page_path: url,
    })
}

export const event = ({ action, category, label, value }: any) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}