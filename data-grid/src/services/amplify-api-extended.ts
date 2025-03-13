import { API } from "aws-amplify";
import { GameAmplify } from "../components/amplify/GameCardAmplify";
import { FetchGamesResponse } from "../hooks/useGamesAmplify";

// Mock API call since we don't have the actual implementation
// In a real-world scenario, this would be replaced with an actual GraphQL query
const listGamesExtendedQuery = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
    $params: AWSJSON
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        background_image
        parent_platforms {
          platform {
            id
            name
            slug
          }
        }
        metacritic
        rating_top
      }
      nextToken
      count
    }
  }
`;

// Define the service for game-related API calls
export const amplifyGameService = {
  /**
   * Fetches games using the Amplify API
   * @param options - Options including page, pageSize, and other filters
   * @returns Promise with the fetch response
   */
  fetchGames: async (options: {
    params?: {
      genres?: number;
      parent_platforms?: number;
      ordering?: string;
      search?: string;
      page?: number;
      page_size?: number;
    };
  }): Promise<FetchGamesResponse> => {
    try {
      // Extract query parameters
      const {
        page = 1,
        page_size = 20,
        genres,
        parent_platforms,
        ordering,
        search,
      } = options.params || {};

      // Convert parameters to a format AWS Amplify can use
      // This is a simplified example - in a real app, you'd map these properly
      const filter = {
        ...(genres && { genreId: { eq: genres } }),
        ...(parent_platforms && { platformId: { eq: parent_platforms } }),
        ...(search && { name: { contains: search.toLowerCase() } }),
      };

      // For pagination
      const limit = page_size;

      // Call the Amplify GraphQL API
      // In a real implementation, this would actually call AWS Amplify
      // For now, we're mocking this response

      // Mock API call - simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data that mimics what would come from AWS Amplify
      // Structured to match the expected GameAmplify interface
      const mockGames: GameAmplify[] = Array.from({ length: 20 }, (_, i) => ({
        id: page * 100 + i,
        name: `Game ${page * 100 + i}`,
        background_image: `https://example.com/game-${i}.jpg`,
        parent_platforms: [
          { platform: { id: 1, name: "PC", slug: "pc" } },
          { platform: { id: 2, name: "PlayStation", slug: "playstation" } },
        ],
        metacritic: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        rating_top: Math.floor(Math.random() * 3) + 3, // Random rating 3-5
      }));

      // Format the response to match what the hook expects
      const response: FetchGamesResponse = {
        count: 100, // Total count of items
        next: page < 5 ? `page=${page + 1}` : null, // Limit to 5 pages for the mock
        results: mockGames,
      };

      return response;

      /* Real implementation would look like this:
      const result = await API.graphql({
        query: listGamesExtendedQuery,
        variables: {
          filter,
          limit,
          nextToken: page > 1 ? `token-for-page-${page}` : null,
          params: JSON.stringify({ ordering }),
        },
      });
      
      // Transform the response to match the expected structure
      const apiResponse = result.data.listGames;
      
      return {
        count: apiResponse.count,
        next: apiResponse.nextToken ? `page=${page + 1}` : null,
        results: apiResponse.items,
      };
      */
    } catch (error) {
      console.error("Error fetching games:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch games"
      );
    }
  },
};

export default amplifyGameService;
