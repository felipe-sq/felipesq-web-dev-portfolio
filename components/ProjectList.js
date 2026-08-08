import React from "react";

import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

// pages/index.js and pages/projects.js render the same list from the same
// data. Keeping the mapping here means the derived case-study URL — the one
// prop that is computed rather than copied — cannot drift between them.
const ProjectList = () => (
  <>
    {projects.map((project) => (
      <ProjectCard
        key={project.id}
        title={project.title}
        description={project.description}
        caseStudyHref={
          project.caseStudy ? `/projects/${project.id}` : undefined
        }
        href={project.href}
        repoHref={project.repoHref}
        initials={project.initials}
        accent={project.accent}
      />
    ))}
  </>
);

export default ProjectList;
