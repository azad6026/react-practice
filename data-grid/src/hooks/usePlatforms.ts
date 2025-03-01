import { useQuery } from "@tanstack/react-query";
import { APIClient, APIClientFetch } from "../services/api-client";

const apiClient = new APIClientFetch<Platform>("/platforms/lists/parents");
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

// const usePlatform = () => ({ data: platforms, isLoading: false, error: null });
const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: () => apiClient.getAll(),
    staleTime: 1000 * 60 * 60 * 24, // 24h
    // initialData: { count: platforms.length, results: platforms },
  });

export default usePlatforms;
