import Redis from "ioredis";

class RedisConnectionManager {
  private static instance: RedisConnectionManager;
  private readonly _client: Redis;

  private constructor() {
    // Pre-decode values for faster initialization
    const host = "13.201.168.242"; // Decoded MTMuMjAxLjE2OC4yNDI=
    const password = "Office@98351"; // Decoded T2ZmaWNlQDk4MzUx
    const port = 6379; // Decoded NjM3OQ==

    this._client = new Redis({
      host,
      port,
      password,
      connectTimeout: 1000, // Lower timeout for faster connection attempts
      maxRetriesPerRequest: 2, // Reduce retries to fail faster
      enableReadyCheck: false, // Skip ready check for faster startup
      lazyConnect: true, // Enable lazy connections
    });
  }

  public static getInstance(): RedisConnectionManager {
    return (RedisConnectionManager.instance ||= new RedisConnectionManager());
  }

  public getClient(): Redis {
    return this._client;
  }
}

// Initialize singleton immediately
export default RedisConnectionManager.getInstance().getClient();
