import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/core";
import ProjectCard from "../components/ProjectCard";
import Container from "../components/Container";

const url = "https://github.com/felipe-sq";
const title = "Felipe Slaughter-Quintero | Coding with Heart";
const description = "Coding and design website design by Felipe Slaughter-Quintero";

const Projects = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "gray.700",
    dark: "gray.400",
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              Project Files
            </Heading>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            mt={8}
          >
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Take a look at some of my prior work. I like to take on a variety of projects to continuously challenge myself and stay up-to-date on the most recent technologies.
            </Text>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              Recent Updates
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Lorem Ipsum Dolorem.
            </Text>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              Attention to Detail
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Lorem Ipsum Dolorem.
            </Text>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              Project features
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Lorem Ipsum Dolorem.
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            mt={8}
          >
            <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
              Individual projects:
            </Heading>
            <ProjectCard
            title="Project 1"
            description="Project 1 placeholder description"
            href="https://github.com/felipe-sq"
            image="/juniper_200.jpg"
          />
          <ProjectCard
            title="Project 2"
            description="Project 2 placeholder description"
            href="https://github.com/felipe-sq"
            image="/beginnings_200.jpeg"
          />
          <ProjectCard
            title="Project 3"
            description="Project 3 placeholder description"
            href="https://github.com/felipe-sq"
            image="/oceans_200.jpg"
          />
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Projects;
