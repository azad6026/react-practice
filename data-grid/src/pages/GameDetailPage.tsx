import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import useGame from "../hooks/useGame";

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
    <>
      <Heading>{game?.name}</Heading>
      <ExpandableText maxChars={400}>{game?.description_raw}</ExpandableText>
      <GameAttributes game={game} />
    </>
  );
};

export default GameDetailPage;
