export const listGamesQuery = `
  query ListGames {
    listGames {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
