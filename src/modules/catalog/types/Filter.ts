interface SearchParams {
  name?: string;
  genres?: string;
  platforms?: string;
  summary?: string;
  franchises?: string;
  modes?: string;
  developers?: string;
  publishers?: string;
  usersScore?: string;
  themes?: string;
  playerPerspectives?: string;
  first_release_date?: string;
  gameEngines?: string;
  collections?: string;
}

interface SortParams {
  sortBy?:
    | "usersScore"
    | "createdAt"
    | "updateAt"
    | "totalScore"
    | "criticsScore"
    | "name";
  order?: "asc" | "desc";
}

interface FilteredGames {
  igdbId: number;
  name: string;
  cover: string | null;
  url: string | null;
  screenshots: {
    id: number;
    url: string;
    gameId: number;
  }[];
  videos: {
    id: number;
    name: string;
    url: string;
    gameId: number;
  }[];
}

type Take = 20 | 40 | 60;
