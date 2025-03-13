import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import useGamesAmplify from "../hooks/useGamesAmplify";
import GameCardAmplify from "./amplify/GameCardAmplify";
import InfiniteScroll from "react-infinite-scroll-component";
import GameCardSkeletonAmplify from "./amplify/GameCardSkeletonAmplify";
import { FetchGamesResponse } from "../services/amplify-api-extended";
import { InfiniteData } from "@tanstack/react-query";

/**
 * GameGridAmplify - Alternative implementation of GameGrid using AWS Amplify
 *
 * This component is a drop-in replacement for the original GameGrid component,
 * but it uses AWS Amplify as its data source. The UI and behavior remain identical
 * to the original component.
 */
const GameGridAmplify = ({ gameQuery }: { gameQuery?: any }) => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGamesAmplify(gameQuery);

  const skeletons = [1, 2, 3, 4, 5, 6];

  const fetchedGamesCount =
    (data as InfiniteData<FetchGamesResponse>)?.pages.reduce(
      (total, page) => total + page.results.length,
      0
    ) || 0;

  if (error)
    return (
      <Text color="red.500">
        Error fetching games:{" "}
        {error instanceof Error ? error.message : "Unknown error occurred"}
      </Text>
    );

  return (
    <Box padding="10px">
      <InfiniteScroll
        dataLength={fetchedGamesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
        endMessage={<Text textAlign="center">No more games</Text>}
      >
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
          {isLoading &&
            skeletons.map((skeleton) => (
              <GameCardSkeletonAmplify key={skeleton} />
            ))}

          {(data as InfiniteData<FetchGamesResponse>)?.pages.map(
            (page, index) => (
              <Fragment key={index}>
                {page.results.map((game) => (
                  <GameCardAmplify key={game.id} game={game} />
                ))}
              </Fragment>
            )
          )}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};

export default GameGridAmplify;
