import { APIClientFetch } from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Platform } from "../entities/Platform";

const apiClient = new APIClientFetch<Game>("/games");
const useGame = (slug: string) =>
  useQuery({
    queryKey: ["games", slug],
    queryFn: () => apiClient.get(slug),
  });

export default useGame;
export interface Game {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
  slug: string;
}
