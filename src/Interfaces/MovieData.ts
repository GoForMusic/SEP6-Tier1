export interface MovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  poster_path: string;
  vote_average: number;
  genres: {
    map(arg0: (genre: any) => any): any;
    id: number;
    name: string;
  };
  // add other properties as needed
  overview: string;
  original_language: string;
}
