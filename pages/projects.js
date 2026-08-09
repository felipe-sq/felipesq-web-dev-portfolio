import React from "react";
import { NextSeo } from "next-seo";
import { useColorMode, Heading, Text, Flex, Stack } from "@chakra-ui/react";
import ProjectList from "../components/ProjectList";
import Container from "../components/Container";
import siteConfig from "../site.config";

const url = `${siteConfig.siteUrl}/projects`;
const title = "Project Files | Felipe Slaughter-Quintero";
const description =
  "Independent projects by Felipe Slaughter-Quintero, software engineer. React, Next.js, TypeScript, Node, and AI integrations.";

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
              Independent projects I can show publicly. Most of my engineering
              happens in production applications I can&apos;t publish, so treat
              what&apos;s below as a sample of how I work rather than the
              ceiling of what I build.
            </Text>
            <Heading size="md" as="h2" mb={2} fontWeight="medium">
              Professional work
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Since 2022 I&apos;ve worked as a software engineer, currently for
              a large enterprise technology organization. That work is
              production React, Next.js, and TypeScript against an established
              design system: Material UI theming and component variants, GraphQL
              and REST integrations, Azure and Cosmos DB, headless CMS content,
              SSR and CSR tradeoffs, dependency and framework upgrades,
              accessibility and focus behavior, and CodeQL findings. It
              isn&apos;t public, which is why it isn&apos;t listed below.
            </Text>
            <Heading size="md" as="h2" mb={2} fontWeight="medium">
              How I build
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              These start as a React or Next.js front end and grow a Node,
              Express, and PostgreSQL back end when the data calls for it. I
              reach for TypeScript on anything large enough to earn it, deploy
              on Vercel, and treat accessibility as part of building rather than
              a pass at the end: labeled controls, working keyboard navigation,
              and color that clears WCAG contrast in both light and dark modes.
            </Text>
            <Heading size="md" as="h2" mb={2} fontWeight="medium">
              Where I&apos;m heading
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Two directions, both built on the same foundation rather than
              replacing it: Shopify and e-commerce development, and AI
              integration work, meaning LLM APIs connected to real workflows
              with the architecture and access controls that implies.
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
              The projects
            </Heading>
            <ProjectList />
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Projects;
