export interface GameData {
  igdbId: number;
  name: string;
  description?: string;
  storyline?: string;
  series?: string;
  franchises?: string[];
  hypes?: number;

  criticsScore?: number;
  criticsCount?: number;
  usersScore?: number;
  usersCount?: number;
  totalScore?: number;
  totalCount?: number;

  releaseDate?: Date | null;
  status?: number;
  category?: number;
  updatedAt: Date;
  createdAt: Date;

  gameDevelopers: string[];
  gamePublishers: string[];
  gameGenres: string[];
  gamePlatforms: string[];
  gameModes: string[];
  gameThemes: string[];
  playerPerspectives: string[];
  franchisesList?: string[];

  cover: string;
  artworks: string[];
  screenshots: string[];
  websites: string[];
  videos: string[];

  collections?: string[];
  gameEngines?: string[];
  url: string;
}
