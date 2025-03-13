import React from "react";
import { Box, Heading, Text, VStack, Code, Divider } from "@chakra-ui/react";
import GameGridAmplify from "./GameGridAmplify";

/**
 * Example component showcasing the new Amplify implementation
 */
const AmplifyExample = () => {
  return (
    <Box p={5}>
      <VStack spacing={4} align="start" mb={8}>
        <Heading size="xl">AWS Amplify Implementation</Heading>
        <Text>
          This is an example of the AWS Amplify implementation of the Game Grid.
          It demonstrates how to use the new GameGridAmplify component with all
          the related Amplify components.
        </Text>
        <Text fontWeight="bold">Key features:</Text>
        <Text pl={4}>
          • Complete isolation from original components
          <br />
          • Custom GameCardAmplify component that doesn't rely on original
          components
          <br />
          • AWS Amplify data fetching with mock implementation
          <br />
          • Full TypeScript support with custom types
          <br />• Identical UI and functionality to the original implementation
        </Text>
      </VStack>

      <Box borderWidth="1px" borderRadius="lg" p={4} bg="gray.50">
        <Heading size="md" mb={4}>
          Game Grid (Amplify Version)
        </Heading>
        <GameGridAmplify />
      </Box>
    </Box>
  );
};

export default AmplifyExample;
