import { useQuery } from "@tanstack/react-query";
import { APIClient, APIClientFetch } from "../services/api-client";
import { Platform } from "../entities/Platform";

const apiClient = new APIClientFetch<Platform>("/platforms/lists/parents");
// const usePlatform = () => ({ data: platforms, isLoading: false, error: null });
const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: () => apiClient.getAll(),
    staleTime: 1000 * 60 * 60 * 24, // 24h
    // initialData: { count: platforms.length, results: platforms },
  });

export default usePlatforms;
