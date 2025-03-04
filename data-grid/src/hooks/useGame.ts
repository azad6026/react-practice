import { APIClientFetch } from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Platform } from "../entities/Platform";
import { Game } from "../entities/Game";

const apiClient = new APIClientFetch<Game>("/games");
const useGame = (slug: string) =>
  useQuery({
    queryKey: ["games", slug],
    queryFn: () => apiClient.get(slug),
  });

export default useGame;
