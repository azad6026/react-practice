import NavBar from "../components/NavBar";
import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <Box padding={5} textAlign="center">
        <Heading>Something went wrong</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "This page could not be found"
            : "An unexxpected error occurred"}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
