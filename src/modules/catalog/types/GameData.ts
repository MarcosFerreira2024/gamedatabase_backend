interface GameData {
  id: number;
  igdbId: number;
  name: string;
  summary: string | null;
  storyline: string | null;
  cover: string | null;
  first_release_date: Date | null;
  url: string;
  createdAt: string;
  updatedAt: string;
  criticsScore: number | null;
  criticsCount: number | null;
  usersScore: number | null;
  usersCount: number | null;
  totalScore: number | null;
  totalCount: number | null;

  artworks: { id: number; url: string; gameId: number }[];
  collections: { id: number; name: string }[];
  developers: { id: number; name: string }[];
  gameEngines: { id: number; name: string }[];
  franchises: { id: number; name: string }[];
  genres: { id: number; name: string }[];
  platforms: { id: number; name: string }[];
  modes: { id: number; name: string }[];
  screenshots: { id: number; url: string; gameId: number }[];
  publishers: { id: number; name: string }[];
  themes: { id: number; name: string }[];
  videos: { id: number; name: string; url: string; gameId: number }[];
  websites: { id: number; url: string; gameId: number }[];
  playerPerspectives: { id: number; name: string }[];
}
