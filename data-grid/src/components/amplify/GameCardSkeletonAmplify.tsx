import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";
import GameCardContainerAmplify from "./GameCardContainerAmplify";

/**
 * Amplify version of GameCardSkeleton component
 * This is a copy of the original component with minimal changes to avoid dependencies
 */
const GameCardSkeletonAmplify = () => {
  return (
    <GameCardContainerAmplify>
      <Card>
        <Skeleton height="200px" />
        <CardBody>
          <SkeletonText />
        </CardBody>
      </Card>
    </GameCardContainerAmplify>
  );
};

export default GameCardSkeletonAmplify;
