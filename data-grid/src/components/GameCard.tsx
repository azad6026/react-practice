import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import { Link } from "react-router-dom";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { colorMode } = useColorMode();
  return (
    <Card
      tabIndex={0}
      transition="all 0.3s linear"
      _hover={{
        transform: "translateY(-4px) scale(1.02) skewY(2deg)",
        boxShadow: "lg",
        cursor: "pointer",
      }}
      _focus={{
        border: "2px solid",
        borderColor: "blue.500",
        outline: "none",
      }}
      className={`card-effect ${
        colorMode === "dark" ? "dark-mode-effect" : "light-mode-effect"
      }`}
    >
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody className="card-effect-body">
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2l">
          <Link to={`/games/${game.slug}`}>{game.name}</Link>
          <Emoji rating={game.rating_top} />
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
