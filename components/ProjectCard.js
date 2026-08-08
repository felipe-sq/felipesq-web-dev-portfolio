import React from "react";
import {
  Flex,
  HStack,
  Link,
  Text,
  Heading,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

// The card body is deliberately not a link. A card can expose a live demo, a
// source repo, or both, and an anchor cannot contain another anchor, so the
// links live in a footer row instead of wrapping the whole card.
//
// Both links are optional: a desktop app has no URL to demo, and a deployed
// project may have no public repo. A card with neither renders no footer at
// all rather than an empty row.
const ProjectCard = ({
  title,
  description,
  href,
  repoHref,
  initials,
  accent,
}) => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: "gray.200",
    dark: "gray.600",
  };
  const linkColor = {
    light: "blue.600",
    dark: "blue.300",
  };

  return (
    <div className="project-card">
      <Flex
        direction="column"
        border="1px solid"
        borderColor={borderColor[colorMode]}
        borderRadius={4}
        p={4}
        _hover={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Flex align="center">
          {/* Decorative: the heading beside it already names the project, so
              the monogram is hidden from screen readers rather than read out. */}
          <Flex
            aria-hidden="true"
            align="center"
            justify="center"
            flexShrink={0}
            boxSize="48px"
            mr={4}
            borderRadius="md"
            bg={accent}
            color="white"
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="tight"
          >
            {initials}
          </Flex>
          <Stack>
            <Heading
              // h3, not h4: each card sits directly under the "Recent Projects"
              // / "The projects" h2, and skipping a level fails heading-order.
              // `as` is independent of `size`, so this changes nothing visually.
              as="h3"
              size="md"
              fontWeight="bold"
              mb={4}
              letterSpacing="tighter"
            >
              {title}
            </Heading>
            <Text lineHeight="1.3">{description}</Text>
          </Stack>
        </Flex>
        {/* Every card repeats "Live demo" / "Code", so each link carries an
            aria-label naming the project. The label starts with the visible
            text so voice control still matches what is on screen. */}
        {(href || repoHref) && (
          <HStack spacing={6} mt={4} pl={{ base: 0, sm: "64px" }}>
            {href && (
              <Link
                href={href}
                isExternal
                aria-label={`Live demo of ${title}`}
                color={linkColor[colorMode]}
                fontWeight="medium"
              >
                Live demo
              </Link>
            )}
            {repoHref && (
              <Link
                href={repoHref}
                isExternal
                aria-label={`Code for ${title}`}
                color={linkColor[colorMode]}
                fontWeight="medium"
              >
                Code
              </Link>
            )}
          </HStack>
        )}
      </Flex>
    </div>
  );
};

export default ProjectCard;
