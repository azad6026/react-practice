import { Box } from "@chakra-ui/react";
import useTrailer from "../hooks/useTrailer";
import React from "react";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data, error, isLoading } = useTrailer(gameId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }
  const first = data?.results[0];
  return first ? (
    <Box maxW="1200px" w="100%" marginY={4}>
      <video
        style={{ width: "100%" }}
        src={first.data[480]}
        controls
        poster={first.preview}
      />
    </Box>
  ) : null;
};

export default GameTrailer;
