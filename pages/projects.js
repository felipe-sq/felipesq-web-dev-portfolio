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
              Coming soon...
            </Text>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              Attention to Detail
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Coming soon...
            </Text>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              Project features
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Coming soon...
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
            title="Chuck Norris Joke Generator"
            description="This project was created with React and features a joke generator tailored to the Chuck Norris fandom!"
            href="https://chuck-norris-jokes-chi.vercel.app"
            image="/juniper_200.jpg"
          />
          <ProjectCard
            title="Water My Plants"
            description="This project was created with React and is designed to allow users to add and manage plants and their water schedules!"
            href="https://watermyplants21-mj7zvundd-tt92-water.vercel.app"
            image="/beginnings_200.jpeg"
          />
          <ProjectCard
            title="Secret Recipes"
            description="Secret Recipes is a React app designed to help users find and share recipes, whether they are family recipes, favorites found online or in cookboooks, or unique creations!"
            href="https://frontend-lovat-sigma.vercel.app/login"
            image="/oceans_200.jpg"
          />
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Projects;
