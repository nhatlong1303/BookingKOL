const env: any = {
    url: process?.env?.NEXT_PUBLIC_REACT_APP_WEB ?? null,
    development: process?.env?.NEXT_PUBLIC_REACT_APP_DEVELOPMENT ?? 'NO',
    api: process?.env?.NEXT_PUBLIC_REACT_APP_API,
    basePath: process?.env?.NEXT_PUBLIC_REACT_BASE_PATH ?? '',
    adsense: process?.env?.NEXT_PUBLIC_GOOGLE_ADSENSE
}
export default env;