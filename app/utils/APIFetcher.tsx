import { IAPIFetcher } from "@/app/types/types";

export const APIFetcher: IAPIFetcher = (url: string, options?: any) =>
  fetch(url, options).then((res) => res.json());
