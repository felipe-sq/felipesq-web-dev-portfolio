import React from "react";
import { useColorMode, Flex } from "@chakra-ui/react";
import Nav from "./Nav";
import Footer from "./Footer";

const Container = ({ children }) => {
  const { colorMode } = useColorMode();

  const bgColor = {
    light: "white",
    dark: "gray.900",
  };
  const primarytextColor = {
    light: "black",
    dark: "white",
  };

  return (
    <>
      <Nav />
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        bg={bgColor[colorMode]}
        color={primarytextColor[colorMode]}
        px={8}
      >
        {children}
        <Footer />
      </Flex>
    </>
  );
};

export default Container;
