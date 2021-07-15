import React from "react";
import { useColorMode, Heading, Text, Flex, Stack } from "@chakra-ui/core";
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
            I write and tinker with code to find out how I can make websites and Web Apps better.
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
            I grew up in California and Oregon as part of an entrepreneurial family which instilled a strong curiosity and work ethic from a young age. I've since moved to Florida, where my curiosity continues to thrive, alongside my desire to understand the inner working of websites, code and technology in general. 
          </Text>
          <Text color={secondaryTextColor[colorMode]} mb={4}>
            My favorite color is green. I love being outside, in the sunshine, whether it's at the beach, at a park or in the back yard. 
          </Text>
          <Text color={secondaryTextColor[colorMode]} mb={4}>
            My background in graphic design and writing help to bring a visually pleasing and engaging aesthetic to everything I create or work on. I enjoy new challenges, so if you have a project which could use a fresh perspective, I'd love to hear from you. 
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
            title="Project 1"
            description="cinematic ambient album, with compositions for piano & strings"
            href="http://example-url.com"
            image="/time_lost_200.jpg"
          />
          <ProjectCard
            title="Project 2"
            description="Debut album, featuring collaborations with Carmody and Monogem"
            href="http://example-url.com"
            image="/oceans_200.jpg"
          />
          <ProjectCard
            title="Project 3"
            description="Treman piano single featured on Spotify's Classical New Releases playlist"
            href="http://example-url.com"
            image="/juniper_200.jpg"
          />
          <ProjectCard
            title="Project 4"
            description="Original music for an award-winning documentary film shown at Manhattan Film Festival and Beloit Film Festival"
            href="http://example-url.com"
            image="/tys_list_200.jpg"
          />

        </Flex>
      </Stack>
    </Container>
  );
};

export default Index;
