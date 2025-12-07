import React from "react";
import NextLink from "next/link";
import styled from "@emotion/styled";
import { useColorMode, Button, Flex, Box, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = {
    light: "white",
    dark: "gray.900",
  };

  const primarytextColor = {
    light: "black",
    dark: "white",
  };

  const navBgColor = {
    light: "rgba(255, 255, 255, 0.8)",
    dark: "rgba(23, 25, 35, 0.8)",
  };

  return (
    <>
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="900px"
        width="100%"
        bg={navBgColor[colorMode]}
        as="nav"
        p={8}
        mt={[0, 8]}
        mb={8}
        mx="auto"
      >
        <NextLink href="/">
          <Button variant="ghost" p={[1, 4]}>
            Home
          </Button>
        </NextLink>
        <Box>
          <NextLink href="/projects">
            <Button variant="ghost" p={[1, 4]}>
              Projects
            </Button>
          </NextLink>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
          />
        </Box>
      </StickyNav>
    </>
  );
};

export default Nav;
