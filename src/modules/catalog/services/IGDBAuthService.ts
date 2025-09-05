import { injectable } from "tsyringe";

@injectable()
class IGDBAuthService {
  private token: string | null = null;

  async requestApiKey(): Promise<string> {
    while (!this.token) {
      try {
        const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_SECRET}&grant_type=client_credentials`;
        const res = await fetch(url, { method: "POST" });
        const data = await res.json();

        if (data.access_token) {
          this.token = data.access_token;
        } else {
          await new Promise((r) => setTimeout(r, 1000));
        }
      } catch {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    return this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

export { IGDBAuthService };
