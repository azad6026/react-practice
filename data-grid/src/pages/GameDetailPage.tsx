import { Heading, Image, Text } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import React from "react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";

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
      {/* <Image src={getCroppedImageUrl(game.background_image)} alt={game?.name} /> */}
    </>
  );
};

export default GameDetailPage;
