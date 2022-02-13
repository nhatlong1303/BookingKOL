const env: any = {
    url: process?.env?.NEXT_PUBLIC_REACT_APP_WEB ?? null,
    development: process?.env?.NEXT_PUBLIC_REACT_APP_DEVELOPMENT ?? 'NO',
    api: process?.env?.NEXT_PUBLIC_REACT_APP_DEVELOPMENT === 'NO' ?
        process?.env?.NEXT_PUBLIC_REACT_APP_API :
        (process?.env?.NEXT_PUBLIC_REACT_APP_API_LOCAL ?? `http://localhost:${process?.env?.NEXT_PUBLIC_PORT ?? 5000}`),
    basePath: process?.env?.NEXT_PUBLIC_REACT_BASE_PATH ?? '',
}
export default env;