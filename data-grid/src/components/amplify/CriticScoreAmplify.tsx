import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

/**
 * Amplify version of CriticScore component
 * This is a copy of the original component with minimal changes to avoid dependencies
 */
const CriticScoreAmplify = ({ score }: Props) => {
  const color = score > 75 ? "green" : score > 60 ? "yellow" : "";

  return (
    <Badge fontSize="14px" paddingX={2} borderRadius="4px" colorScheme={color}>
      {score}
    </Badge>
  );
};

export default CriticScoreAmplify;
