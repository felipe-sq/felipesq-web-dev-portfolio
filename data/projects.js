// Single source of truth for the project list.
// Rendered by pages/index.js ("Recent Projects") and pages/projects.js
// ("Individual projects") via components/ProjectCard.js.
//
// `href` is the live demo. `repoHref` is optional — the card renders a second
// "Code" link only for the entries that have one.
//
// `initials` and `accent` drive the monogram tile the card draws in place of a
// thumbnail image. Every accent clears 4.5:1 against the white monogram, so the
// tile stays legible in both color modes. The teal is the site accent, shared
// with pages/api/og.js and safari-pinned-tab.svg.
const projects = [
  {
    id: "chuck-norris-jokes",
    title: "Chuck Norris Joke Generator",
    description:
      "This project was created with React and features a joke generator tailored to the Chuck Norris fandom!",
    href: "https://chuck-norris-jokes-chi.vercel.app",
    initials: "CN",
    accent: "#c05621",
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
      "Secret Recipes is a React app designed to help users find and share recipes, whether they are family recipes, favorites found online or in cookboooks, or unique creations!",
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
