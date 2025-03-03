import { Heading, Image, Text } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import React from "react";
import { useParams } from "react-router-dom";

const GameDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: game, error, isLoading } = useGame(slug!);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !game) {
    return <div>Error: {error.message}</div>;
  }
  return (
    //  I need to get a game slug and title and description and image and rating
    // write a query to get the game details

    <>
      <Heading>{game?.name}</Heading>
      <Text>{game?.description_raw}</Text>
      {/* <Image src={getCroppedImageUrl(game.background_image)} alt={game?.name} /> */}
    </>
  );
};

export default GameDetailPage;
