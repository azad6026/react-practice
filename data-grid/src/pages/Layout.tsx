import { Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Box padding="4">
        <NavBar />
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
