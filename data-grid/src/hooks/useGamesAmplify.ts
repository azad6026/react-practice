import { useInfiniteQuery } from "@tanstack/react-query";
import { GameAmplify } from "../components/amplify/GameCardAmplify";
import { amplifyGameService } from "../services/amplify-api-extended";
import ms from "ms";

/**
 * Custom hook for fetching games using AWS Amplify
 * This hook is designed to be a drop-in replacement for useGames
 */
const useGamesAmplify = (gameQuery?: any) => {
  return useInfiniteQuery<FetchGamesResponse, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      amplifyGameService.fetchGames({
        params: {
          genres: gameQuery?.genreId,
          parent_platforms: gameQuery?.platformId,
          ordering: gameQuery?.sortOrder,
          search: gameQuery?.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms("24h"), // Cache for 24 hours
  });
};

export interface FetchGamesResponse {
  count: number;
  next: string | null;
  results: GameAmplify[];
}

export default useGamesAmplify;
