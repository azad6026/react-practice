import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}
const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "ed8dfcff9fea48fd9c9446c1a5be8932",
  },
});

// Axios API Client
class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
}
// Fetch API Client - replaced Axios with Fetch API

class APIClientFetch<T> {
  endpoint: string;
  baseURL: string;
  apiKey: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.baseURL = "https://api.rawg.io/api";
    this.apiKey = import.meta.env.VITE_GAMES_API_KEY || ""; // Replace with your actual API key
  }
  getAll = async (config?: {
    params?: { [key: string]: string | number | undefined };
  }): Promise<FetchResponse<T>> => {
    const url = new URL(`${this.baseURL}${this.endpoint}`);
    url.searchParams.append("key", this.apiKey);

    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(url.toString(), {
      ...config,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  };
}

export { APIClient, APIClientFetch };
