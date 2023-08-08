import { IDownloadLinks } from "./Links";

interface EpsLinks {
  title?: string;
  tvId?: string;
}

export interface ITVDetail {
  title: string;
  description: string;
  trailer?: string;
  created_at: string;
  genre?: string;
  year?: string;
  duration?: string;
  country?: string;
  realease?: string;
  number_of_eps?: string;
  network?: string;
  artist?: string;
  eps_links?: Array<EpsLinks>;
}

export interface ISeriesDetail {
  title?: string;
  streaming_links?: Array<string>;
  download_links?: Array<IDownloadLinks>;
  eps_links?: Array<EpsLinks>;
}