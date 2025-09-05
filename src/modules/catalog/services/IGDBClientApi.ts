import { injectable, inject } from "tsyringe";
import { IGDBAuthService } from "./IGDBAuthService";

@injectable()
class IGDBApiClient {
  constructor(
    @inject("IGDBAuthService") private authService: IGDBAuthService
  ) {}

  async fetch(endpoint: string, ids: number[], fields: string[] = ["name"]) {
    const token =
      this.authService.getToken() || (await this.authService.requestApiKey());
    if (ids.length === 0) return [];

    const body = `
      fields ${fields.join(",")};
      where id = (${ids.join(",")});
      
    `;

    const response = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_CLIENT_ID!,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
      body,
    });

    return response.json();
  }

  async fetchAll(endpoint: string, fields: string[], maxGames = 2) {
    const token =
      this.authService.getToken() || (await this.authService.requestApiKey());
    const results: any[] = [];
    let offset = 0;
    const limit = 50;

    while (results.length < maxGames) {
      const body = `
            fields ${fields.join(",")};
            limit ${limit};
            offset ${offset};
            sort popularity desc;
            where first_release_date != null | first_release_date > 0;
          `;

      const response = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
        method: "POST",
        headers: {
          "Client-ID": process.env.IGDB_CLIENT_ID!,
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
        body,
      });

      const batch = await response.json();
      if (!batch.length) break;
      results.push(...batch);
      offset += limit;
    }

    return results;
  }
}

export { IGDBApiClient };
