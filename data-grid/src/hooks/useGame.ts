import { useQuery } from "@tanstack/react-query";
import Game from "../entities/Game";
import { APIClientFetch } from "../services/api-client";

const apiClient = new APIClientFetch<Game>("/games");
const useGame = (slug: string) =>
  useQuery({
    queryKey: ["games", slug],
    queryFn: () => apiClient.get(slug),
  });

export default useGame;
