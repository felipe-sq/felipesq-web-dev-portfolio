// Single source of truth for the project list.
// Rendered by pages/index.js ("Recent Projects") and pages/projects.js
// ("The projects") via components/ProjectCard.js.
//
// `href` (live demo) and `repoHref` (source) are both optional, and the card
// renders a link only for the ones an entry has. A desktop app with no URL to
// demo is repo-only; an entry with neither gets no footer row at all.
//
// `initials` and `accent` drive the monogram tile the card draws in place of a
// thumbnail image. Every accent clears 4.5:1 against the white monogram, so the
// tile stays legible in both color modes. The teal is the site accent, shared
// with pages/api/og.js and safari-pinned-tab.svg.
const projects = [
  {
    id: "interview-drill",
    title: "Interview Drill",
    description:
      "A spaced-repetition trainer for frontend interview questions. Answer out loud, rate your recall, and the FSRS algorithm brings each question back on the day you are about to forget it. Next.js and TypeScript, with review history kept in the browser — no account and no backend.",
    href: "https://interview-drill-demo.vercel.app",
    repoHref: "https://github.com/felipe-sq/interview-drill",
    initials: "ID",
    accent: "#b83280",
  },
  {
    id: "water-my-plants",
    title: "Water My Plants",
    description:
      "A full-stack plant-care scheduler: React 19 and Vite on the front end, Express and PostgreSQL behind it, with token auth so each account manages its own plants.",
    href: "https://water-my-plants-felipesqs-projects.vercel.app",
    repoHref: "https://github.com/felipe-sq/water-my-plants",
    initials: "WP",
    accent: "#2b6cb0",
  },
  {
    id: "secret-recipes",
    title: "Secret Recipes",
    description:
      "A React app for collecting and sharing recipes — family standbys, finds from a cookbook, or your own inventions.",
    href: "https://frontend-lovat-sigma.vercel.app/login",
    initials: "SR",
    accent: "#6b46c1",
  },
  {
    id: "simple-grocery-list",
    title: "Simple Grocery List",
    description:
      "A demo grocery list app built with Next.js and TypeScript that runs entirely in the browser — color-coded lists, tag filtering by aisle, and barcode scanning that fills in product names. No account and no backend: lists live in the browser tab, and the sign-in screen is a UI demonstration.",
    href: "https://simple-grocery-list-demo.vercel.app/",
    repoHref: "https://github.com/felipe-sq/simple-grocery-list",
    initials: "SG",
    accent: "#2c7a6b",
  },
];

export default projects;
