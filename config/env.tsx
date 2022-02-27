interface Env {
    url: string | undefined,
    development: string,
    api: string | undefined,
    basePath: string,
    adsense: string | undefined,
    analytics: string | undefined
}

const env: Env = {
    url: process?.env?.NEXT_PUBLIC_REACT_APP_WEB ?? undefined,
    development: process?.env?.NEXT_PUBLIC_REACT_APP_DEVELOPMENT ?? 'NO',
    api: process?.env?.NEXT_PUBLIC_REACT_APP_API,
    basePath: process?.env?.NEXT_PUBLIC_REACT_BASE_PATH ?? '',
    adsense: process?.env?.NEXT_PUBLIC_GOOGLE_ADSENSE,
    analytics: process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS
}
export default env;