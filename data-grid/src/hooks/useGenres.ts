import { useQuery } from "@tanstack/react-query";
import Genre from "../entities/Genre";
import { APIClientFetch } from "../services/api-client";

const apiClient = new APIClientFetch<Genre>("/genres");
// const useGenre = () => ({ data: genres, isLoading: false, error: null });
const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () => apiClient.getAll(),
    staleTime: 1000 * 60 * 60 * 24, // 24h
    // initialData: { count: genres.length, results: genres },
  });

export default useGenres;
