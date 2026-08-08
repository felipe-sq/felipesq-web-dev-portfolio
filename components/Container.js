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
      {/* Deliberately not <main>. Each page supplies its own <main> around the
          page content, and a <main> inside a <main> is invalid — as is putting
          the site <footer> inside <main> at all. This is the layout wrapper;
          the landmarks belong to Nav, the page, and Footer. */}
      <Flex
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
