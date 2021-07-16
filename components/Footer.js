import React from 'react';
import { Flex, Link, IconButton } from '@chakra-ui/core';

// const gitFollow = '<iframe src="https://github.com/felipe-sq/" width="300" height="56" scrolling="no" frameborder="0" style="border:none; overflow:hidden;" allowtransparency="true"></iframe>'

// const iframe =  () => {
//   return {
//     __html: gitFollow
//   }
// };

const Footer = () => (
  <Flex align="center" mb={4} direction="column">
    <div>
      <Link
        href="https://www.instagram.com/"
        title="Instagram"
        icon="instagram"
        isExternal
      >
        <IconButton
          aria-label="Instagram"
          icon="instagram"
          size="lg"
          color="gray.500"
          variant="ghost"
        />
      </Link>
      <Link
        href="https://www.youtube.com/"
        title="YouTube"
        isExternal
      >
        <IconButton
          aria-label="YouTube"
          icon="youtube"
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
