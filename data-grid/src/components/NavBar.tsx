import { HStack, Image, Box, Flex } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box width="100%" borderBottom="1px" borderColor="gray.200">
      <Flex
        padding="10px"
        alignItems="center"
        width="100%"
        maxWidth="1400px"
        margin="0 auto"
        gap={4}
      >
        <Link to="/">
          <Image src={logo} boxSize="60px" objectFit={"cover"} />
        </Link>
        <Box flex="1">
          <SearchInput />
        </Box>
        <ColorModeSwitch />
      </Flex>
    </Box>
  );
};

export default NavBar;
