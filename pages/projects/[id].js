import React from "react";
import NextLink from "next/link";
import { NextSeo } from "next-seo";
import {
  useColorMode,
  Heading,
  HStack,
  Link,
  Text,
  Flex,
  Stack,
} from "@chakra-ui/react";

import Container from "../../components/Container";
import { projects, CASE_STUDY_SECTIONS } from "../../data/projects";
import siteConfig from "../../site.config";

// Only projects that actually have a `caseStudy` get a page. Everything else
// 404s rather than rendering a title with nothing under it, which is also why
// this route can be fully prerendered with fallback: false.
const caseStudyProjects = projects.filter((project) => project.caseStudy);

export const getStaticPaths = async () => ({
  paths: caseStudyProjects.map((project) => ({ params: { id: project.id } })),
  fallback: false,
});

export const getStaticProps = async ({ params }) => {
  const project = caseStudyProjects.find(({ id }) => id === params.id);

  // fallback: false means Next never asks for an id outside `paths`, so this
  // is a guard against the data changing underneath the route, not a 404 path
  // users can reach.
  if (!project) {
    return { notFound: true };
  }

  // Only the sections this project filled in, already in canonical order, so
  // the component renders a list instead of testing eight keys by hand.
  const sections = CASE_STUDY_SECTIONS.filter(
    ({ key }) => project.caseStudy[key],
  ).map(({ key, heading }) => ({
    heading,
    paragraphs: [].concat(project.caseStudy[key]),
  }));

  return {
    props: {
      project: {
        title: project.title,
        description: project.description,
        href: project.href || null,
        repoHref: project.repoHref || null,
        stack: project.stack || null,
        summary: project.caseStudy.summary || null,
      },
      sections,
      url: `${siteConfig.siteUrl}/projects/${project.id}`,
    },
  };
};

const CaseStudy = ({ project, sections, url }) => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "gray.700",
    dark: "gray.400",
  };
  // The pair ProjectCard uses, so links read as links in both color modes.
  const linkColor = {
    light: "blue.600",
    dark: "blue.300",
  };

  const title = `${project.title} | Felipe Slaughter-Quintero`;
  const description = project.summary || project.description;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: "article",
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
            <Link
              as={NextLink}
              href="/projects"
              color={linkColor[colorMode]}
              fontWeight="medium"
              mb={4}
            >
              Back to all projects
            </Link>
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              {project.title}
            </Heading>
            {/* Set apart by size, not by a dimmer color: gray.500 on the dark
                background lands around 4:1 and would fail the contrast audit
                at this size. */}
            {project.stack && (
              <Text color={secondaryTextColor[colorMode]} fontSize="sm" mb={2}>
                {project.stack.join(" · ")}
              </Text>
            )}
            {project.summary && (
              <Text color={secondaryTextColor[colorMode]} fontSize="lg">
                {project.summary}
              </Text>
            )}
            {(project.href || project.repoHref) && (
              <HStack spacing={6} mt={4}>
                {project.href && (
                  <Link
                    href={project.href}
                    isExternal
                    color={linkColor[colorMode]}
                    fontWeight="medium"
                  >
                    Live demo
                  </Link>
                )}
                {project.repoHref && (
                  <Link
                    href={project.repoHref}
                    isExternal
                    color={linkColor[colorMode]}
                    fontWeight="medium"
                  >
                    Code
                  </Link>
                )}
              </HStack>
            )}
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
          >
            {/* h2 under the page h1: sections are the only headings on this
                page, so the order stays sequential however many render. */}
            {sections.map(({ heading, paragraphs }) => (
              <React.Fragment key={heading}>
                <Heading
                  letterSpacing="tight"
                  mb={4}
                  mt={8}
                  size="xl"
                  fontWeight={700}
                >
                  {heading}
                </Heading>
                {paragraphs.map((paragraph) => (
                  <Text
                    key={paragraph}
                    color={secondaryTextColor[colorMode]}
                    mb={4}
                  >
                    {paragraph}
                  </Text>
                ))}
              </React.Fragment>
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default CaseStudy;
