import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import useGame from "../hooks/useGame";
import GameTrailer from "../components/GameTrailer";
import GameScreenshots from "../components/GameScreenshots";

const GameDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: game, error, isLoading } = useGame(slug!);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !game) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={6}>
      <Box>
        <Heading>{game?.name}</Heading>
        <ExpandableText maxChars={400}>{game?.description_raw}</ExpandableText>
        <GameAttributes game={game} />
      </Box>
      <Box>
        <GameTrailer gameId={game.id} />
        <GameScreenshots gameId={game.id} />
      </Box>
    </SimpleGrid>
  );
};

export default GameDetailPage;
