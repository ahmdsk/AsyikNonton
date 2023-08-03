export interface ITVDetail {
  title: string;
  description: string;
  created_at: string;
  genre?: string;
  year?: string;
  duration?: string;
  country?: string;
  realease?: string;
  number_of_eps?: string;
  network?: string;
  artist?: string;
  eps_links: (string | undefined)[];
}
