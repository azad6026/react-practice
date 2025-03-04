import { useQuery } from "@tanstack/react-query";
import { APIClientFetch } from "../services/api-client";
import { Trailer } from "../entities/Trailer";

const useTrailer = (gameId: number) => {
  const apiClient = new APIClientFetch<Trailer>(`/games/${gameId}/movies`);
  return useQuery({
    queryKey: ["trailers", gameId],
    queryFn: () => apiClient.getAll(),
  });
};

export default useTrailer;
