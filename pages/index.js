import React from "react";
import {
  useColorMode,
  Grid,
  Heading,
  Link,
  Text,
  Flex,
  Stack,
} from "@chakra-ui/react";
import Container from "../components/Container";
import ProjectList from "../components/ProjectList";
import PersonJsonLd from "../components/PersonJsonLd";

// The stack as discrete terms rather than sentences. The About copy above it
// explains what the work was; this is the version a recruiter scans in three
// seconds and a keyword filter can actually match. Grouped and set as plain
// text on purpose — badges would fight the typography everywhere else.
//
// Mirrored by `knowsAbout` in components/PersonJsonLd.js.
const stack = [
  { label: "Languages", items: ["JavaScript", "TypeScript"] },
  { label: "Frameworks", items: ["React", "Next.js", "Node.js"] },
  { label: "Data & APIs", items: ["GraphQL", "REST", "Azure", "Cosmos DB"] },
  { label: "Interface", items: ["Material UI", "Accessibility (WCAG)"] },
  { label: "AI", items: ["LLM API integration"] },
  { label: "Commerce", items: ["Shopify"] },
  { label: "Tooling", items: ["Git"] },
];

const Index = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "gray.700",
    dark: "gray.400",
  };
  // Same pair ProjectCard uses for its footer links, so inline links in body
  // copy read as links in both color modes.
  const linkColor = {
    light: "blue.600",
    dark: "blue.300",
  };

  return (
    <Container>
      <PersonJsonLd />
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
            I&apos;m a software engineer. I build production web applications
            with React, Next.js, and TypeScript, and I work at the intersection
            of software, AI, and e-commerce.
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
            I&apos;ve worked as a software engineer since 2022, currently for a
            large enterprise technology organization. Day to day that means
            production React and Next.js applications: reusable components
            against an established design system, GraphQL and REST integrations,
            headless CMS content shaped for the front end, framework upgrades
            planned and validated, and accessibility and security findings run
            down and fixed. Most of my work happens inside systems that already
            exist, not greenfield demos.
          </Text>
          <Text color={secondaryTextColor[colorMode]} mb={4}>
            Alongside that I treat AI as infrastructure rather than a feature. I
            self-hosted and heavily customized an LLM-driven creative-strategy
            assistant on a private server, running against both the OpenAI and
            Anthropic APIs and reachable from Telegram, Discord, Slack, and a
            browser dashboard, with private networking and my own tunnel and
            access tooling on top. The interesting part was never the model; it
            was the wiring, the access controls, and the deployment around it.
          </Text>
          <Text color={secondaryTextColor[colorMode]} mb={4}>
            I also hold a BBA, and I&apos;ve spent years on the commercial side
            of the web: conversion, landing pages, lifecycle email, offer
            positioning. It means I tend to ask what a feature is meant to
            accomplish, and for whom, before I ask how to build it. Accessible,
            fast, maintainable software and software that actually moves a
            business forward are usually the same problem approached from two
            directions.
          </Text>
          <Text color={secondaryTextColor[colorMode]} mb={4}>
            Right now I&apos;m deepening my Shopify and e-commerce development
            work, where that combination earns its keep. If you have a project
            that could use it,{" "}
            <Link
              href="mailto:fslauq@gmail.com"
              color={linkColor[colorMode]}
              fontWeight="medium"
            >
              I&apos;d love to hear from you
            </Link>
            .
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Stack
          </Heading>
          {/* A description list, so the grouping is structure rather than
              layout: each label is the term its technologies belong to. */}
          <Grid
            as="dl"
            width="100%"
            templateColumns={{ base: "1fr", sm: "10rem 1fr" }}
            columnGap={6}
            rowGap={{ base: 3, sm: 2 }}
            m={0}
          >
            {stack.map(({ label, items }) => (
              <React.Fragment key={label}>
                <Text
                  as="dt"
                  color={secondaryTextColor[colorMode]}
                  fontWeight="medium"
                >
                  {label}
                </Text>
                <Text as="dd" m={0}>
                  {items.join(", ")}
                </Text>
              </React.Fragment>
            ))}
          </Grid>
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
          <ProjectList />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Index;
