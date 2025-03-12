import React, { useEffect, useState } from "react";
import {
  Authenticator,
  useAuthenticator,
  Button as AmplifyButton,
} from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { GraphQLResult } from "aws-amplify/api";
import { listGamesQuery } from "../services/amplify-api";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Heading,
  Card,
  CardBody,
  Stack,
  Divider,
  CardFooter,
  Center,
  Spinner,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Code,
} from "@chakra-ui/react";
import "@aws-amplify/ui-react/styles.css";

// Create a client
const client = generateClient();

// Define types for our GraphQL response
interface ListGamesResponse {
  listGames: {
    items: Game[];
    nextToken?: string;
  };
}

interface Game {
  id: string;
  name: string;
  genreId: string;
  added: number;
  slug?: string;
  genre?: {
    name: string;
    id: string;
    image_background: string;
    games_count: number;
  };
}

const AuthModal: React.FC = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <Authenticator />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const GameContent: React.FC = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);

  const fetchGames = async () => {
    setIsLoading(true);
    setError(null);
    setErrorDetails(null);

    try {
      console.log("Fetching games using GraphQL");

      // Log the query being sent
      console.log("Query:", listGamesQuery);

      const response = await client.graphql<ListGamesResponse>({
        query: listGamesQuery,
      });
      console.log("GraphQL response:", JSON.stringify(response, null, 2));

      // Type assertion to handle the response properly
      const result = response as GraphQLResult<ListGamesResponse>;

      // Check for GraphQL errors
      if (result.errors && result.errors.length > 0) {
        console.error("GraphQL returned errors:", result.errors);
        setErrorDetails({
          message: "GraphQL returned errors",
          errors: result.errors,
          data: result.data,
        });
        throw new Error(result.errors.map((e) => e.message).join(", "));
      }

      if (result.data?.listGames?.items) {
        // Filter out null items
        const validGames = result.data.listGames.items.filter(
          (item) => item !== null
        );

        if (validGames.length > 0) {
          console.log("Valid games found:", validGames);
          setGames(validGames);
        } else {
          console.log("No valid games found in response");
          setGames([]);
          setErrorDetails({
            message: "No valid games found",
            data: result.data,
          });
        }
      } else {
        console.log("No games found in response or unexpected response format");
        setGames([]);
        setErrorDetails({
          message: "No games found or unexpected format",
          data: result.data,
        });
      }
    } catch (err) {
      console.error("Error fetching games:", err);

      // Properly handle error objects
      let errorMessage = "Unknown error";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object") {
        errorMessage = JSON.stringify(err);
      } else if (err) {
        errorMessage = String(err);
      }

      setError(new Error(errorMessage));
      setErrorDetails({
        message: errorMessage,
        fullError: err,
      });

      toast({
        title: "Error fetching games",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const renderGameGrid = () => {
    if (isLoading) {
      return (
        <Center h="50vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      );
    }

    if (error) {
      return (
        <Center h="auto" flexDirection="column" p={6}>
          <Text color="red.500" mb={4} fontWeight="bold">
            Error loading games: {error.message}
          </Text>

          {errorDetails && (
            <Box width="100%" overflowX="auto" mb={4}>
              <Heading size="sm" mb={2}>
                Error Details:
              </Heading>
              <Code
                p={4}
                borderRadius="md"
                width="100%"
                display="block"
                whiteSpace="pre-wrap"
                bg="gray.100"
              >
                {typeof errorDetails === "object"
                  ? JSON.stringify(errorDetails, null, 2)
                  : String(errorDetails)}
              </Code>

              <Heading size="sm" mt={4} mb={2}>
                GraphQL Query:
              </Heading>
              <Code
                p={4}
                borderRadius="md"
                width="100%"
                display="block"
                whiteSpace="pre-wrap"
                bg="gray.100"
              >
                {listGamesQuery}
              </Code>

              <Box mt={4}>
                <Heading size="sm" mb={2}>
                  Troubleshooting Steps:
                </Heading>
                <Text mb={2}>
                  1. Check if your database has games with null genreId values
                </Text>
                <Text mb={2}>
                  2. Verify your GraphQL schema matches your data structure
                </Text>
                <Text mb={2}>
                  3. Check the Amplify configuration in main.tsx
                </Text>
                <Text mb={2}>
                  4. Try a simpler query in the Amplify console
                </Text>
              </Box>
            </Box>
          )}

          <Button colorScheme="blue" onClick={fetchGames} mt={4}>
            Retry
          </Button>
        </Center>
      );
    }

    if (games.length === 0) {
      return (
        <Center h="50vh" flexDirection="column">
          <Text mb={4}>No games found.</Text>

          {errorDetails && (
            <Box width="100%" maxW="800px" overflowX="auto" mb={4}>
              <Heading size="sm" mb={2}>
                Response Details:
              </Heading>
              <Code
                p={4}
                borderRadius="md"
                width="100%"
                display="block"
                whiteSpace="pre-wrap"
              >
                {JSON.stringify(errorDetails, null, 2)}
              </Code>
            </Box>
          )}

          <Button colorScheme="blue" onClick={fetchGames} mt={4}>
            Retry
          </Button>
        </Center>
      );
    }

    return (
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={6}
        p={4}
      >
        {games.map((game) => (
          <GridItem key={game.id}>
            <Card maxW="sm" h="100%">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{game.name}</Heading>
                  {game.genre && (
                    <Text color="blue.600" fontSize="sm">
                      Genre: {game.genre.name}
                    </Text>
                  )}
                  <Text fontSize="sm">
                    Added: {new Date(game.added).toLocaleDateString()}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    ID: {game.id}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    GenreID: {game.genreId}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Button flex="1" variant="ghost" colorScheme="blue">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Box
        p={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="blue.500"
        color="white"
      >
        <Heading size="lg">Game Collection</Heading>
        <Box display="flex" alignItems="center">
          {user ? (
            <>
              <Text mr={4} fontSize="sm">
                Signed in as: {user.username}
              </Text>
              <Box
                as="button"
                onClick={signOut}
                px={4}
                py={2}
                borderRadius="md"
                bg="white"
                color="blue.500"
              >
                Sign Out
              </Box>
            </>
          ) : (
            <Box
              as="button"
              onClick={onOpen}
              px={4}
              py={2}
              borderRadius="md"
              bg="white"
              color="blue.500"
            >
              Sign In
            </Box>
          )}
        </Box>
      </Box>
      {renderGameGrid()}
      {isOpen && <AuthModal />}
    </Box>
  );
};

const GameList: React.FC = () => {
  return (
    <Authenticator.Provider>
      <GameContent />
    </Authenticator.Provider>
  );
};

export default GameList;
