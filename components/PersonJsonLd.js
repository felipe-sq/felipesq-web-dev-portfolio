import React from "react";

import siteConfig from "../site.config";

// Structured data for the person behind the site. The role changed — the name
// used to be associated with "Web Developer, UI Design and Content Creator" —
// and `jobTitle` plus `knowsAbout` are the fields that tell a search engine
// which association is current.
//
// `sameAs` is the part that does the disambiguating: it links this name to
// profiles the search engine already has, so the three are understood as one
// entity rather than three.
export const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Felipe Slaughter-Quintero",
  jobTitle: "Software Engineer",
  url: siteConfig.siteUrl,
  sameAs: [
    "https://github.com/felipe-sq",
    "https://www.linkedin.com/in/felipe-slaughter-quintero/",
  ],
  // Kept deliberately in step with the Stack section on the landing page: the
  // machine-readable list and the human-readable one should not disagree.
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "GraphQL",
    "REST APIs",
    "Material UI",
    "Microsoft Azure",
    "Azure Cosmos DB",
    "Git",
    "Web Accessibility",
    "AI and LLM API Integration",
    "Shopify",
  ],
};

// A native <script> rather than next/script: JSON-LD is data, not code to
// schedule. The `<` escape is the standard guard against a string in the
// payload closing the tag early.
const PersonJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(person).replace(/</gu, "\\u003c"),
    }}
  />
);

export default PersonJsonLd;
