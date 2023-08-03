export interface IMovie {
  title: string;
  movieId?: string | undefined;
  thumbnail_url: string | undefined;
  duration: string;
  rating: string;
  quality: string;
  eps_now?: string;
}
