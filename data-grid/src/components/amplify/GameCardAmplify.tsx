import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CriticScoreAmplify from "./CriticScoreAmplify";
import PlatformIconListAmplify from "./PlatformIconListAmplify";
import GameCardContainerAmplify from "./GameCardContainerAmplify";
import EmojiAmplify from "./EmojiAmplify";
import getCroppedImageUrlAmplify from "../../services/image-url-amplify";

// Define our own Game type to avoid importing from entities folder
export interface GameAmplify {
  id: number;
  name: string;
  background_image?: string;
  parent_platforms?: { platform: Platform }[];
  metacritic?: number;
  rating_top?: number;
}

// Define our own Platform type to avoid importing from entities folder
interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  game: GameAmplify;
}

/**
 * Amplify version of GameCard component
 * This is a stand-alone component that doesn't depend on existing components
 */
const GameCardAmplify = ({ game }: Props) => {
  const platforms = game.parent_platforms?.map((p) => p.platform) || [];

  return (
    <GameCardContainerAmplify>
      <Card>
        <Image src={getCroppedImageUrlAmplify(game.background_image || "")} />
        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <PlatformIconListAmplify platforms={platforms} />
            <CriticScoreAmplify score={game.metacritic || 0} />
          </HStack>
          <Heading fontSize="2xl">
            <Link to={`/games/${game.id}`}>{game.name}</Link>
          </Heading>
          <EmojiAmplify rating={game.rating_top || 0} />
        </CardBody>
      </Card>
    </GameCardContainerAmplify>
  );
};

export default GameCardAmplify;
