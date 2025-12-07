import React from "react";
import { useColorMode, Heading, Text, Flex, Stack } from "@chakra-ui/react";
import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";

const Index = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "gray.700",
    dark: "gray.400",
  };

  return (
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
            Hi, I’m Felipe.
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            I write and tinker with code to find out how I can make websites and
            Web Apps better.
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
            About
          </Heading>
          <Text color={secondaryTextColor[colorMode]} mb={4}>
            I grew up in California and Oregon as part of an entrepreneurial
            family which instilled a strong curiosity and work ethic from a
            young age. I've since moved to Florida, where my curiosity continues
            to thrive, alongside my desire to understand the inner working of
            websites, code and technology in general.
          </Text>
          <Text color={secondaryTextColor[colorMode]} mb={4}>
            My favorite color is green. I love being outside, in the sunshine,
            whether it's at the beach, at a park or in the back yard.
          </Text>
          <Text color={secondaryTextColor[colorMode]} mb={4}>
            My background in graphic design and writing help to bring a visually
            pleasing and engaging aesthetic to everything I create or work on. I
            enjoy new challenges, so if you have a project which could use a
            fresh perspective, I'd love to hear from you.
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Recent Projects
          </Heading>
          <ProjectCard
            title="Chuck Norris Joke Generator"
            description="This project was created with React and features a joke generator tailored to the Chuck Norris fandom!"
            href="https://chuck-norris-jokes-chi.vercel.app"
            image="/time_lost_200.jpg"
          />
          <ProjectCard
            title="Water My Plants"
            description="This project was created with React and is designed to allow users to add and manage plants and their water schedules!"
            href="https://watermyplants21-mj7zvundd-tt92-water.vercel.app"
            image="/oceans_200.jpg"
          />
          <ProjectCard
            title="Secret Recipes"
            description="Secret Recipes is a React app designed to help users find and share recipes, whether they are family recipes, favorites found online or in cookboooks, or unique creations!"
            href="https://frontend-lovat-sigma.vercel.app/login"
            image="/juniper_200.jpg"
          />
          <ProjectCard
            title="The Honey-Do List!"
            description="A simple, colorful to-do list app designed to help users keep track of their daily tasks!"
            href="https://quirky-leakey-14d7e6.netlify.app"
            image="/tys_list_200.jpg"
          />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Index;
