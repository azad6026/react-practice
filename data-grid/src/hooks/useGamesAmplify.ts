import { useInfiniteQuery } from "@tanstack/react-query";
import {
  amplifyGameService,
  FetchGamesResponse,
} from "../services/amplify-api-extended";
import ms from "ms";

/**
 * Custom hook for fetching games using AWS Amplify
 * This hook is designed to be a drop-in replacement for useGames
 */
const useGamesAmplify = (gameQuery?: any) => {
  return useInfiniteQuery<FetchGamesResponse, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam }) =>
      amplifyGameService.fetchGames({
        params: {
          genres: gameQuery?.genreId,
          parent_platforms: gameQuery?.platformId,
          ordering: gameQuery?.sortOrder,
          search: gameQuery?.searchText,
          page: pageParam as number,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms("24h"), // Cache for 24 hours
  });
};

export default useGamesAmplify;
