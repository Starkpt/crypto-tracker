export const APIFetcher = (url: string, options?: any) => fetch(url).then((res) => res.json());
