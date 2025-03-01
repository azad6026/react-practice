export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genre_ids: string[];
  release_date: string;
}
export interface APIresponse {
  results: Movie[];
}
