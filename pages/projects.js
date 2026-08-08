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
} from "@chakra-ui/react";
import ProjectCard from "../components/ProjectCard";
import Container from "../components/Container";
import projects from "../data/projects";
import siteConfig from "../site.config";

const url = `${siteConfig.siteUrl}/projects`;
const title = "Felipe Slaughter-Quintero | Coding with Heart";
const description =
  "Coding and design website design by Felipe Slaughter-Quintero";

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
              Take a look at some of my prior work. I like to take on a variety
              of projects to continuously challenge myself and stay up-to-date
              on the most recent technologies.
            </Text>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              Recent Updates
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              I am currently working on a few new projects and Apps to better my
              skills and learn new technologies. My main focus is on React,
              JavaScript, and Node.js.
            </Text>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              Project features
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              The projects listed below are a just a small selection of my work.
              I am always looking for new projects to add to my portfolio.
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
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                href={project.href}
                initials={project.initials}
                accent={project.accent}
              />
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Projects;
