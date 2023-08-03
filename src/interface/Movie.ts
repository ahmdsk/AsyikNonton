import { IDownloadLinks } from "./Links";

export interface IMovie {
  title: string;
  movieId?: string | undefined;
  thumbnail_url: string | undefined;
  duration: string;
  rating: string;
  quality: string;
  eps_now?: string;
}

export interface IMovieDetail {
  title: string;
  description: string;
  created_at: string;
  tagline?: string;
  rating?: string;
  genre?: string;
  quality?: string;
  year?: string;
  duration?: string;
  country?: string;
  realease?: string;
  language?: string;
  director?: string;
  artist?: string;
  download_links?: IDownloadLinks[];
  streaming_links?: (string | undefined)[];
}