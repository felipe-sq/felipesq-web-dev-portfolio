import React from "react";
import { Flex, Link, Text, Heading, Stack, useColorMode } from "@chakra-ui/react";

const ProjectCard = ({ title, description, href, initials, accent }) => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: "gray.200",
    dark: "gray.600",
  };

  return (
    <div className="project-card">
      <Link
        mb={4}
        href={href}
        title={title}
        isExternal
        _hover={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          textDecoration: "none",
        }}
      >
        <Flex
          align="center"
          border="1px solid"
          borderColor={borderColor[colorMode]}
          borderRadius={4}
          p={4}
        >
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
              as="h4"
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
      </Link>
    </div>
  );
};

export default ProjectCard;
