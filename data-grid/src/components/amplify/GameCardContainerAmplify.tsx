import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Amplify version of GameCardContainer component
 * This is a copy of the original component with minimal changes to avoid dependencies
 */
const GameCardContainerAmplify = ({ children }: Props) => {
  return (
    <Box borderRadius={10} overflow="hidden">
      {children}
    </Box>
  );
};

export default GameCardContainerAmplify;
