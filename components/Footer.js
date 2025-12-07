import React from "react";
import { Flex, Link, IconButton } from "@chakra-ui/react";

const gitFollow =
  '<iframe src="https://github.com/felipe-sq/" width="300" height="56" scrolling="no" frameborder="0" style="border:none; overflow:hidden;" allowtransparency="true"></iframe>';

const iframe = () => {
  return {
    __html: gitFollow,
  };
};

const Footer = () => (
  <Flex align="center" mb={4} direction="column">
    <div>
      <Link
        href="https://github.com/felipe-sq"
        title="GitHub"
        icon="github"
        isExternal
      >
        <IconButton
          aria-label="GitHub"
          icon="github"
          size="lg"
          color="gray.500"
          variant="ghost"
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/felipe-slaughter-quintero/"
        title="LinkedIn"
        isExternal
      >
        <IconButton
          aria-label="LinkedIn"
          icon="linkedin"
          size="lg"
          color="gray.500"
          variant="ghost"
        />
      </Link>
      <Link href="mailto:fslauq@gmail.com" title="Email" isExternal>
        <IconButton
          aria-label="Email"
          icon="mail"
          size="lg"
          color="gray.500"
          variant="ghost"
        />
      </Link>
      {/* <div dangerouslySetInnerHTML={ iframe() } /> */}
    </div>
  </Flex>
);

export default Footer;
