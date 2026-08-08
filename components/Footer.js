import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/felipe-sq",
    icon: <GitHubIcon />,
    isExternal: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/felipe-slaughter-quintero/",
    icon: <LinkedInIcon />,
    isExternal: true,
  },
  {
    label: "Email",
    href: "mailto:fslauq@gmail.com",
    icon: <MailIcon />,
    isExternal: false,
  },
];

const Footer = () => (
  <Flex align="center" mb={4} direction="column" as="footer">
    <div>
      {socialLinks.map(({ label, href, icon, isExternal }) => (
        <IconButton
          key={label}
          as="a"
          href={href}
          aria-label={label}
          title={label}
          icon={icon}
          size="lg"
          color="gray.500"
          variant="ghost"
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        />
      ))}
    </div>
  </Flex>
);

export default Footer;
