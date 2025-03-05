import { Box, SimpleGrid } from "@chakra-ui/react";
import useScreenshots from "../hooks/useScreenshots";
import Screenshot from "@/entities/Screenshot";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, isLoading, error } = useScreenshots(gameId);
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={6}>
      {data?.results.map((screenshot: Screenshot) => (
        <Box key={screenshot.id}>
          <img src={screenshot.image} alt="" style={{ width: "100%" }} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default GameScreenshots;
