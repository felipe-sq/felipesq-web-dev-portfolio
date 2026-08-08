// Single source of truth for the project list.
//
// Rendered by pages/index.js ("Recent Projects"), pages/projects.js ("The
// projects") via components/ProjectCard.js, and — for entries that have a
// `caseStudy` — pages/projects/[id].js.
//
// Written as CommonJS for the same reason site.config.js is: scripts/
// generate-sitemap.js has to require() this list to expand /projects/[id]
// into one URL per case study, and it runs as a plain Node script.
//
// ── Card fields ──────────────────────────────────────────────────────────
// `href` (live demo) and `repoHref` (source) are both optional, and the card
// renders a link only for the ones an entry has. A desktop app with no URL to
// demo is repo-only; an entry with neither gets no footer row at all.
//
// `initials` and `accent` drive the monogram tile the card draws in place of a
// thumbnail image. Every accent clears 4.5:1 against the white monogram, so the
// tile stays legible in both color modes. The teal is the site accent, shared
// with pages/api/og.js and safari-pinned-tab.svg.
//
// ── Case-study fields ────────────────────────────────────────────────────
// `caseStudy` is optional, and so is every section inside it. An entry without
// one gets no case-study page and no "Case study" link on its card; an entry
// with two sections renders those two and nothing else. The section order and
// headings live in CASE_STUDY_SECTIONS below — this object is a bag of keys,
// not an ordered list, so adding a section to a project never means touching
// the page component.
//
// Each section is an array of paragraphs (a bare string is accepted too).
// `summary` is a standalone lede above the first section, and `stack` is an
// optional list of technologies shown beneath the page title.

// Ordered once, here, so pages/projects/[id].js can map over it. `key` matches
// the property name inside `caseStudy`; `heading` is the visible h2.
const CASE_STUDY_SECTIONS = [
  { key: "problem", heading: "Problem" },
  { key: "constraints", heading: "Constraints" },
  { key: "approach", heading: "Approach" },
  { key: "implementation", heading: "Implementation" },
  { key: "challenges", heading: "Challenges" },
  { key: "solution", heading: "Solution" },
  { key: "outcome", heading: "Outcome" },
  { key: "learned", heading: "What I Learned" },
];

const projects = [
  {
    id: "easy-file-converter",
    title: "Easy File Converter",
    description:
      "A macOS desktop app for converting and combining video files, built with Electron and FFmpeg. The default profile re-encodes to H.265 to roughly halve the file size, and both shortcuts — stream copy and VideoToolbox hardware encoding — are scoped so they cannot quietly undercut that.",
    repoHref: "https://github.com/felipe-sq/easy-file-converter",
    initials: "EF",
    // 7.53:1 against the white monogram, and distinct from the four accents
    // already in use (pink, blue, purple, teal).
    accent: "#9b2c2c",
    stack: ["Electron", "Node.js", "FFmpeg", "JavaScript", "macOS"],
    caseStudy: {
      summary:
        "A single-purpose macOS tool, rebuilt from scratch for public release. The decision that shaped it wasn't how to make conversion fast — it was recognizing where the fastest path defeats what the user actually asked for.",
      problem: [
        "Large .mov recordings on my Mac needed to end up on an iPad, and a handful of them was enough to fill the device. FFmpeg already solves the conversion — on the command line, one invocation at a time, and only if you remember the right flags.",
        "I wanted that as a repeatable batch operation with a window around it, running entirely on my own machine.",
      ],
      constraints: [
        "Local only. The video never leaves the machine — no upload step, and no service to pay for or trust with the footage.",
        "FFmpeg is licensed separately from the app, and the Homebrew build is dynamically linked against libraries in /opt/homebrew. The binaries stay out of the repository, so the app has to locate them at runtime rather than assume them.",
        "Apple Silicon macOS. The hardware encoding path is VideoToolbox-specific, so there is no pretending this is cross-platform.",
        "The renderer is a web page with no Node access. Anything privileged — the filesystem, native dialogs, spawning FFmpeg — happens in the main process.",
        "Transcoding saturates the CPU, so jobs run one at a time. A parallel queue would make the machine unusable while it worked.",
      ],
      approach: [
        "Split by responsibility, and enforce it: main.js owns the window, native dialogs, queues and persisted settings; converter.js owns FFmpeg; preload.js is an explicit allowlist of IPC channels and nothing more; renderer.js only tracks UI state. The renderer runs with contextIsolation on, nodeIntegration off, and a restrictive Content Security Policy.",
        "Two named profiles instead of exposed FFmpeg flags. Compressed, the default, targets roughly half the original size. High Quality is for when a device needs to play the file more than the disk needs the space. Nobody should have to know what CRF means to use this.",
        "Probe before deciding. Every input goes through ffprobe first, and what comes back decides whether the file gets a full encode, a downscale, or a straight stream copy.",
      ],
      implementation: [
        "Compressed mode is libx265 at CRF 26, tagged hvc1 so QuickTime and iOS recognize the track. High Quality is libx264 at CRF 22, or h264_videotoolbox capped at 5 Mbps when hardware acceleration is switched on.",
        "The fast path is a full stream copy, and it is eligible only when the probe reports an MP4 container with H.264 video and AAC audio and nothing needs downscaling. Audio is copied independently whenever it is already AAC, even when the video is being re-encoded.",
        "Anything above 1280×720 is scaled with aspect-preserving padding, so the framing survives and output dimensions stay predictable. Every output is written with faststart so it plays before it finishes downloading.",
        "Combine mode makes the same decision one level up. If every input is already MP4/H.264/AAC and none need scaling, the files go through FFmpeg's concat demuxer with a straight copy. Otherwise each input becomes an intermediate MPEG-TS segment in the OS temp directory, concatenated from there, with the temp directory removed on success and on failure alike.",
        "Single-file conversions run sequentially; combine jobs queue and wait for an explicit start, so selecting four batches doesn't immediately commit the machine to an hour of work. Either can be canceled mid-flight, and preferences persist between sessions.",
      ],
      challenges: [
        "The cheapest path was the wrong default. Stream copying is free next to a re-encode, so my first instinct was to take it whenever the codecs allowed. That quietly defeats the app: in Compressed mode a stream copy returns a file the same size as the input, and shrinking the file is the entire reason that mode exists. The eligibility check now returns false in Compressed mode before it inspects a single codec name — the fast path is gated on what was asked for, not only on what FFmpeg could get away with.",
        "Hardware acceleration isn't a free speedup either. VideoToolbox is bitrate-controlled, and the size reduction in Compressed mode comes from CRF, so that path deliberately stays on the CPU encoder and only H.264 gets hardware. Hardware encoders also fail at runtime for reasons a probe cannot predict, so the error handler retries once on the CPU before reporting a failure.",
        "Packaging broke in a way development never showed. The build bundles the app into an ASAR archive, and a binary inside an ASAR cannot be executed — FFmpeg worked from source and failed from the built .app. The fix unpacks the binary directory from the archive and resolves it at runtime, falling back through the packaged location to whatever is on PATH.",
        "The main process, the preload bridge and the renderer agreed on every IPC channel name purely by convention. A typo in any of them fails silently at runtime, and nothing at build time was checking.",
      ],
      solution: [
        "Select files, pick a profile, and the app decides the rest: probe, downscale if the source is larger than 720p, stream-copy where that is genuinely equivalent, re-encode where it isn't. Progress is reported per file and overall, throttled so it doesn't flood the UI, and any job can be canceled.",
        "The IPC contract is now covered by tests that need no FFmpeg, footage, or display: every source file parses, and the three processes are checked against each other, so a channel the main process sends but the bridge never listens for fails in CI instead of in the app.",
      ],
      outcome: [
        "A folder of .mov recordings becomes a folder of MP4s at roughly the size reduction the compressed profile targets, framing intact, without any of it leaving the machine. It replaced the command line for the job it was built for.",
        "The rebuild is the version that is public. Prettier, ESLint and the smoke suite run in GitHub Actions on every push and pull request, and the README documents the FFmpeg setup, the security posture, and a Known Limitations section stating plainly what it does not do: Apple Silicon only, no standalone distribution without a static FFmpeg build, and no automated coverage of the transcoding paths themselves.",
      ],
      learned: [
        "An optimization that contradicts the feature is a bug. The remux shortcut was correct FFmpeg and wrong software — the code did exactly what it said, and only knowing what the mode was for would have caught it. Reading a diff can't find that class of mistake; knowing the product intent can.",
        "Test the seams, not the parts you can't test. Transcoding needs binaries, real footage and a display, none of which belong in CI. The IPC contract needs none of that and breaks silently, so that is what the tests cover.",
        "Writing down what the software does not do was worth more than another feature. The limitations section is the part of the README I would want to read first if someone handed me this project.",
      ],
    },
  },
  {
    id: "interview-drill",
    title: "Interview Drill",
    description:
      "A spaced-repetition trainer for frontend interview questions. Answer out loud, rate your recall, and the FSRS algorithm brings each question back on the day you are about to forget it. Next.js and TypeScript, with review history kept in the browser — no account and no backend. The repository also carries a Claude-powered generation route, rate-limited and built so the bundled bank always serves every question, so the live demo depends on no key and no third-party host.",
    href: "https://interview-drill-demo.vercel.app",
    repoHref: "https://github.com/felipe-sq/interview-drill",
    initials: "ID",
    accent: "#b83280",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "ts-fsrs",
      "Claude API",
      "Vitest",
    ],
    caseStudy: {
      summary:
        "This project exists because the one it replaced broke in the worst way a portfolio demo can. The rebuild is organized around a single constraint: nothing the app needs to work should be something I do not control.",
      problem: [
        'This portfolio used to link a joke generator I wrote in 2021. In August 2026 I opened it and found it stuck on "Loading joke…" forever. Its only data source, api.icndb.com, had been abandoned, and the domain had since been re-registered — a request for a joke now redirected to an online gambling site. Anyone clicking through from my portfolio saw a hung page whose network tab pointed at a casino.',
        "The code was not the problem. The code worked. The problem was that the app's entire reason for existing was one call to somebody else's server, so the app could not outlive it. That is the failure I wanted the replacement to be structurally incapable of repeating.",
      ],
      constraints: [
        "No key, no third-party host, no required environment variable. The acceptance test is literal: delete every .env file, load the app, and a full session still has to be playable start to finish.",
        "The answers ship under my name. A vague or subtly wrong answer is worse than no question at all — one bad answer discounts the whole bank for the reviewer who spots it.",
        "Question ids are permanent. Scheduling state keys off them, so renaming an id orphans that question's entire review history.",
        "It is a portfolio demo, so there is nothing to operate: no account, no database, and no ongoing cost or maintenance surface beyond the deployment itself.",
      ],
      approach: [
        'Pick a concept where an API is an ingredient rather than the product. A quote generator or a journal-prompt generator is the same "fetch one random string" shape as the joke generator and would have inherited the same fragility. Spaced repetition is not: the value is in the scheduling and the history, and the content can ship with the build.',
        "I did look for a question API first. OpenTDB needs no key and is CORS-open, but its computing category is retro trivia — a sample pull asked about a 1983 home computer and the Utah Teapot — and it rate-limited to a 429 on a second request within a second. QuizAPI.io requires a server-side key and leans DevOps. Both would have reintroduced exactly the dependency that killed the last project, so the bank is local and curated.",
        "Use FSRS through the ts-fsrs library rather than hand-rolling SM-2. Writing the algorithm myself would have been the flashier move; choosing a well-maintained, zero-dependency MIT library and wrapping it cleanly is the better engineering call. The judgment worth showing is knowing which problem is already solved. What is hand-written and tested is everything around it — the persisted card shape, the session queue, the statistics.",
      ],
      implementation: [
        "Next.js 16 on the App Router with React 19 and TypeScript in strict mode, styled with Tailwind v4 and shadcn/ui primitives, review state in Zustand.",
        "The bank is imported statically in lib/bank.ts, so it is part of the build, and served by the app's own route handler at /api/questions with force-static rendering. There is no filesystem read at request time and no external host anywhere in the path. That module also validates the bank at build time: a duplicate id, an unknown topic, or an empty prompt fails the build rather than shipping.",
        "lib/scheduler.ts is the only module in the app that knows how scheduling works. It speaks the persisted card shape — ISO strings in, ISO strings out — and never reads the clock; every function takes `now` as an argument. That one rule is what makes the scheduling logic deterministic and testable, and it is why no component anywhere does date math.",
        "lib/queue.ts assembles a session: due work first, then new work in whatever room is left under the session cap. Burying reviews you already owe under fresh material is how a spaced-repetition queue spirals. Ordering is fully deterministic, down to a tie-break on id so equal due dates cannot reorder between renders.",
        "Statistics are computed in local calendar days rather than rolling 24-hour windows, so a streak survives studying at 11pm and again at 8am, and anything overdue lands in today's column instead of a past one.",
        "The signature control is the rating bar. Each of the four grades shows the interval it will actually schedule — Again 1m, Hard 6m, Good 10m, Easy 8d — computed by the real scheduler against the real card. The whole premise of the app is that your rating changes when the question comes back, so that consequence belongs on the button that causes it, not in a stats page afterward.",
        "Accessibility is built into the same surface: Space reveals, 1 through 4 rate, focus moves to the answer when it appears so a screen reader lands on the new content, and each rating is announced politely. Grade is never carried by color alone — every one also has a label, a keyboard digit, and a fixed position in the bar.",
      ],
      challenges: [
        "Persisted state and server rendering disagree by default. The store reads localStorage, the server renders with none of it, and reading it during the first render throws a hydration mismatch. The store hydrates explicitly after mount instead, and every component that shows review data waits on a hydration flag read through useSyncExternalStore — so the server snapshot stays explicitly empty rather than being mirrored into state and hoped for.",
        "A live clock made the interface twitch. The rating buttons preview real intervals, so reading `now` on every render meant the numbers shifted while you were looking at them. The clock is now frozen per card and only re-read when the card changes; a session is short enough that the drift does not matter.",
        "Prompts needed markdown, not just answers. Questions carry inline code like `setTimeout(fn, 0)`, which first shipped as literal backticks on screen. Rendering the prompt as markdown put a paragraph element inside a heading, which is invalid HTML, so the inline renderer unwraps it.",
        "Removing what looked like a build-time-only dependency broke the build. Uninstalling the shadcn package produced a blank page and an unresolvable import: the current CLI also ships a stylesheet that the app's global CSS imports, which makes it a genuine runtime dependency rather than just a scaffolding tool.",
        "Verifying sixty answers turned out to be a different kind of work than writing the code, and the slower half of the project.",
      ],
      solution: [
        "Answers were checked in three passes of honestly different strength. Every behavioral JavaScript claim was executed in Node and compared against what the answer asserts — 55 assertions across event-loop ordering, coercion, promise combinator semantics, temporal dead zone behavior, prototype lookup, and module semantics. Factual claims were checked against primary sources: web.dev for Core Web Vitals, the W3C for WCAG contrast ratios, MDN for CORS and redirect semantics, react.dev for React 19 signatures. Four answers were corrected as a result, including a contrast threshold that was off by a fraction of a pixel and a cookie default that was attributed to browsers generally when it belongs specifically to Chromium.",
        'The third pass is the one worth naming: the claims that are not verifiable. "Always use strict equality," "prefer an HttpOnly cookie over localStorage" — these are defensible positions, not facts, and they are written as recommendations rather than stated as rules.',
        "The edges that could dead-end a user are handled explicitly rather than left to fail quietly. A saved session referencing a question the bank no longer has says so and confirms the review history is intact, instead of rendering an empty card. Deselecting every topic in the filter means all topics rather than none, so there is no way to filter yourself into an empty deck by accident.",
      ],
      outcome: [
        "The portfolio no longer links a hung page pointing at a squatted domain, and the thing that replaced it cannot fail that way: 60 questions across JavaScript, React, CSS, HTML and accessibility, and the web platform, all shipping with the build. Delete every environment file and the app still runs a full session end to end.",
        "The three pure modules — scheduler, queue, statistics — carry 62 unit tests between them, covering every rating, lapse behavior, due-date boundaries, session caps, streak gaps, and the JSON round trip that browser storage requires. They are the most reviewable code in the project, which is deliberate.",
        "There is an AI question-generation route in the repository, built and tested, and constructed so that it can never become the only path to a question. With no key configured it reports itself unavailable, the panel that would offer it does not render at all, and every question comes from the bundled bank. On or off, a full session never needs a key or a third-party host — which is the one property the project exists to have, and the failure it refuses to be able to repeat.",
        "It also declines to run in production with a key but no rate limiter, on the reasoning that a spend guard which fails open is worse than none at all: it reads as protection while billing without a ceiling. Two limits sit in front of any model call — one per visitor, one global daily cap — because a per-visitor limit on its own bounds nothing when the caller can change address. The generation modules and the route bring the suite to 148 tests, with the model call mocked at the module boundary so refusals, rate-limit rejections and the fail-closed path can all be exercised deterministically.",
        "What is not done is written down rather than implied. The bank is worth growing, and the constraint on that is not code — it is that every answer has to be good enough to trust in a real interview.",
      ],
      learned: [
        "An architectural risk does not show up in a code review. Nothing about the old project's code was wrong, and no amount of reading it would have predicted that its API host would be sold to a casino. The question a review cannot ask is what this software depends on to work at all, and whose lifespan that is.",
        "Purity is a testing strategy, not a stylistic preference. The single rule that scheduling code never reads the clock is what let the intervals, the boundaries, and the streak arithmetic be tested exhaustively without mocking time. I also turned off the library's interval randomization for the same reason — reproducible numbers matter more here than the clumping it prevents.",
        "The content was the hard part, and treating it that way was the right call. Anyone can render a question bank; the work was making sixty answers correct enough to say out loud in an interview, and being explicit about which claims I executed, which I checked against a primary source, and which are judgment calls I am not going to pretend are facts.",
      ],
    },
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
    stack: ["React", "Vite", "Express", "PostgreSQL", "Knex", "JWT", "Vercel"],
    caseStudy: {
      summary:
        "Reviving a 2021 team project whose host had shut down. The hard part was not the migration — it was reading the original code carefully enough to notice that the API had never checked who was calling it.",
      problem: [
        "Water My Plants was a 2021 team project split across two repositories: a Create React App frontend on Netlify and an Express and Knex API on Heroku. Heroku retired its free tier in November 2022 and took the API and its database with it. The frontend stayed up and could no longer log anyone in.",
        "Reviving it meant deciding what reviving it meant, and reading the code answered that question differently than I expected. The deployment was not the reason it did not work. It had not fully worked while it was hosted either.",
        "The authentication middleware had been written and was never applied to a single route, so the entire API was public. GET /api/users returned every row of the users table — bcrypt hashes included — to any caller with no token at all. The plants table had no owner column, so every account shared one global plant list. Several handlers referenced identifiers that existed nowhere in the project, left behind from an unrelated scaffold. The seed inserted a plaintext password, so the account it created could never log in. The frontend deleted plants from local state without ever calling the API, so they came back on the next refresh.",
      ],
      constraints: [
        "One project, one deployment. Two repositories with two hosts and a hardcoded cross-origin URL between them is what made the original fragile enough that a single provider's pricing change ended it.",
        "It is a public demo where anyone can sign up with any username. That makes isolation between accounts the property that decides whether the thing is safe to leave running, not a feature to add later.",
        "The API runs as a serverless function and the database scales to zero when idle. There is no long-lived process to hold state in, and the first request after a quiet spell pays a wake-up cost that the interface has to account for.",
        "The 2021 client sends its token as a bare Authorization header value rather than a Bearer credential. Rewriting the API is fine; silently breaking a client that behaves that way is not.",
      ],
      approach: [
        "Audit before rewriting. I read the original front to back and wrote down every defect as a separate line rather than starting fresh, because a rewrite that does not know what was broken tends to reproduce it. That list is in the repository's README, which is the honest place for it.",
        "Consolidate the two halves into one project so the frontend and API share an origin. The old client had its Heroku URL hardcoded in four separate files; a same-origin /api makes that entire category of bug unrepresentable.",
        "Push ownership down to the data layer instead of enforcing it in handlers. A route that forgets a check is a bug waiting to be written, so the plants model simply does not offer an unscoped query — there is no 'find all plants' function to call by accident.",
      ],
      implementation: [
        "Express 5 and Knex 3 against Postgres, with a Vite and React 19 frontend, deployed as a single Vercel project. The serverless entry point exports the Express app directly, since an Express app is already a request handler; vercel.json routes /api/* to it and sends everything else to index.html so client-side routing survives a hard refresh.",
        "In development the Vite server proxies /api to the local API, so the browser talks to a same-origin /api exactly as it does in production. No CORS configuration, no environment-specific base URL, and no class of bug that only appears in one of the two.",
        "The schema carries the rules the application used to be trusted with. Plants have a user_id foreign key with cascading delete and an index; usernames are unique at the database level, so a duplicate registration surfaces as a Postgres unique violation translated to a 409 rather than a race the application layer has to win.",
        "Every plant route mounts the auth gate at the router level rather than per handler, so a route added later cannot be added unprotected. The gate verifies the token, checks it against a revocation list, and confirms the account still exists — a token outliving its user is otherwise perfectly valid.",
        "The users model selects an explicit list of public columns, which is what keeps password hashes out of responses structurally rather than by remembering to delete a key. The single function that does return the hash is named for it and documented as unsafe to serialize.",
        "Plant validation rebuilds a clean object from only the fields it checked, so a caller cannot smuggle a user_id through the request body and reassign someone else's plant. Logging out writes the still-valid token to a revocation table and opportunistically prunes rows that have passed their own expiry, so the table cannot grow forever.",
        "On the client, one axios instance attaches the token on the way out and, on the way back, clears the session and returns to the login screen on a 401 — so a revoked or expired token cannot leave a half-authenticated interface on screen.",
      ],
      challenges: [
        "Logging out and immediately back in locked the account. Tokens were fully determined by the user and the issued-at claim, which has second resolution, so a second login inside the same second produced a byte-identical token — one the revocation list had just recorded. The account stayed locked out until the clock ticked over. Every token now carries a random unique identifier, which is a one-line fix for a bug that only exists inside a one-second window and would have been miserable to diagnose from a user report.",
        "Deleting your own account bounced you to a sign-in form for an account that no longer existed. Clearing the session re-rendered the profile route under its auth guard, whose redirect ran afterward and sent you to /login. Account deletion is terminal, so it now leaves through a hard navigation to the homepage rather than a client-side transition that races the guard.",
        "The production database connection was quietly on course to stop verifying certificates. node-postgres is moving `sslmode=require` toward libpq's meaning, where it asks for encryption without validating the certificate at all. The connection string looked correct and would have kept looking correct while the guarantee underneath it changed, so verification is now set explicitly in the Knex config rather than inferred from a URL.",
        "The database-free unit tests were not database-free. The integration suite was being picked up by the default test run, so the fast checks silently required a live Postgres — which is exactly the kind of thing that makes people stop running tests locally.",
      ],
      solution: [
        "The two suites are now genuinely separate. 26 unit tests cover routing, request validation, the auth gate, and token issuance with no database at all. 18 integration tests run against real Postgres, truncating between cases, and cover registration, login, the full plant lifecycle, profile updates, logout revocation, and cross-user isolation.",
        "The tests that matter most are the ones asserting the negatives: that one account cannot list or modify another's plants, that a user_id in the request body is ignored, that a password is never stored or returned in plaintext, that a stack trace never reaches the client in production, and that logging out and back in within the same second works. Each of those corresponds to something that was actually wrong, which is a better source of test cases than imagining what might break.",
      ],
      outcome: [
        "The app works again, as one deployment instead of two, and it works correctly in ways the original did not: accounts only ever see their own plants, deleting an account takes its plants with it, and deleting a plant deletes it.",
        "The rebuild is documented as an audit rather than a release. The README lists every defect that was found and fixed, in the security, broken-code, and cleanup categories, so the interesting part of the project is legible without cloning it.",
        "The stack moved forward with it — React 17 to 19, Create React App to Vite, Express 4 to 5, React Router 5 to 7, Jest to Vitest — but the upgrade is the least significant thing that happened here.",
      ],
      learned: [
        "Middleware that is written but never mounted is worse than middleware that does not exist. The file was there, correctly implemented, imported in the router — and applied to nothing. It read as a project with authentication, which is precisely why nobody noticed it did not have any. Security review has to follow what actually executes, not what the file tree implies.",
        "The most reliable place to enforce a rule is the layer that cannot be skipped. Ownership checks in route handlers depend on every current and future handler remembering; a foreign key and a model with no unscoped query do not depend on anyone remembering anything. I would rather make the mistake unrepresentable than catch it in review.",
        "Reading old work carefully is a real technique, not just diligence. Nearly everything worth fixing here was invisible from the outside — the app looked like it was down for hosting reasons, and if I had migrated it without reading it, it would have come back up and still been wrong.",
      ],
    },
  },
  {
    id: "secret-recipes",
    title: "Secret Recipes",
    description:
      "Paste a recipe in any shape and it comes back as structured ingredients — quantity, unit, item, preparation — which makes scaling, unit conversion and a merged shopping list fall out of the same data. The parser is about 80% accurate and the app is designed around that: the original line is never overwritten, so a wrong reading is visible and correctable instead of silently wrong.",
    href: "https://secret-recipes-demo.vercel.app",
    repoHref: "https://github.com/felipe-sq/secret-recipes",
    initials: "SR",
    accent: "#6b46c1",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vitest"],
    caseStudy: {
      summary:
        "A 2021 team project whose backend died with Heroku's free tier, rebuilt around the one problem the recipe domain actually has. The decision that shaped it was refusing to rebuild it as what it used to be.",
      problem: [
        "The original was a build-week project split across two repositories: a Create React App frontend I worked on, and an Express API on Heroku that another team owned. Heroku retired its free tier in November 2022 and took the API and its database with it. The frontend still renders; the login form fails with a CORS error, which is misleading — there is no server left on the other end to send the header.",
        "The obvious repair was the one I had already done for Water My Plants: consolidate both halves into one repository, modernize, add a backend, redeploy.",
        "That would have been wrong, and recognizing it was the actual work. A recipe box rebuilt that way is signup, token auth, user-scoped CRUD and Postgres — feature for feature what Water My Plants already is. I would have spent the effort to end up with two portfolio entries demonstrating one skill set, where the second adds nothing.",
      ],
      constraints: [
        "No account and no database. Recipes live in the browser, so there is no signup wall between a reader and the demo, and nothing to keep alive or pay for. The thing that killed the original was depending on a service somebody else operated.",
        "The app has to work with every environment file deleted. There are no keys and no third-party services to configure.",
        "Ingredient text is written by people, not machines. Vulgar fractions, mixed numbers, ranges, abbreviations with and without periods, pack sizes in brackets, and preparation notes that may or may not follow a comma.",
        "The parser will never be fully accurate. Every site and every cook writes ingredients differently and the remainder is unbounded, so the design has to survive being wrong rather than assume it won't be.",
      ],
      approach: [
        "Find what the domain offers that the alternative doesn't. Plants have no interesting data problem; recipes do. Turning \"2 1/2 c. flour, sifted\" into structured fields is a real parsing problem, and once ingredients are structured, recipe scaling, unit conversion and a cross-recipe shopping list are all queries against the same shape. It is also what the 2021 app promised on its own landing page and never shipped.",
        "Make being wrong safe rather than rare. The original text of every ingredient is kept and never rewritten — not by editing, not by scaling. Structured fields are an overlay on top of it, and the item name falls back to the whole line when nothing can be isolated, so it is never empty.",
        "Keep every judgment call in one testable layer. All arithmetic, parsing and unit selection lives in plain functions with no framework around them, and that layer is the entire tested surface.",
      ],
      implementation: [
        "The parser is a pipeline of small stages, each consuming a prefix of the line or declining to. A stage that doesn't match simply doesn't consume, which is exactly the partial-result behavior the overlay model needs. The alternative — one large regular expression with eight optional groups — produces no partial result at all: the line either matches or it doesn't.",
        "Quantities are exact fractions rather than decimals. The usual justification is wrong, and checking it mattered: a single (1/3) × 3 really is exactly 1 in floating point. What breaks is accumulation, which is the entire job of a shopping list, and equality — printing \"½ cup\" requires knowing a value is one half, which float comparison cannot tell you reliably.",
        "Each unit carries the denominators it can actually be measured in, because that is a fact about measuring cups rather than about arithmetic. Teaspoons come in eighths and cups do not, so scaling a quarter cup by 1.5 produces six tablespoons rather than an unmeasurable three-eighths of a cup.",
        "URL import reads the schema.org data most recipe sites already publish, through a single route handler that holds no credentials. The extraction itself is a pure function tested against saved pages, and the network code is separate so the interesting half is testable offline.",
      ],
      challenges: [
        "Reading a capital T as a teaspoon. Unit lookup folded case before matching, so \"3 T. butter\" became three teaspoons instead of three tablespoons. In recipe convention capital T is tablespoon and lowercase t is teaspoon — the one place case carries meaning — and the error is threefold in the direction that ruins the dish.",
        "Silently guessing a density. The weight table matched the bare word \"flour\" as a suffix, so almond flour quietly took all-purpose density: 120 g/cup against its real 96. It produced a confident, plausible, wrong number, which is the exact failure the table exists to prevent. Suffix matching is now restricted to multi-word entries, so almond flour returns no answer at all.",
        "A scaling rule that was right for one line and wrong for another. Anything mentioning the pan was marked unscalable, which is correct for \"butter, for greasing the griddle\" and wrong for \"1 cup flour, plus more for dusting\" — there the stated cup is a real measurement, and doubling the recipe was leaving the flour alone.",
        "Answers that were exact and useless. Scaling a cookie recipe by 1.5 rendered its flour as \"54 tablespoons.\" Correct, measurable, and nothing a person would do. The first fix searched for the largest unit that fit and produced \"1 pint + 22 tablespoons,\" which is the same mistake wearing a different hat.",
      ],
      solution: [
        "Amounts render the way a cookbook writes them: \"3 cups + 6 tablespoons,\" with the whole part in the smallest unit that holds one. Both of those bugs came out of opening the running app rather than from the test suite, which is the argument for doing it.",
        "Three features refuse to answer rather than guess, and each refusal is the feature. A volume-to-weight conversion for an unknown ingredient says so instead of falling back to the density of water. A shopping list that gets one cup of flour from one recipe and 200 grams from another shows both amounts side by side, with a note explaining that combining them would mean assuming a density. Scaling warns about leaveners instead of applying a sublinear curve, because there is no defensible exponent for one.",
        "Two invariants are asserted over the whole fixture corpus: the original line comes back byte for byte, and the item name is never empty. They are what let an imperfect parser ship.",
      ],
      outcome: [
        "397 tests, all in the logic layer, with no component tests by design. Verified against live recipe sites and confirmed to hold its guards on the deployed version.",
        "The README states the limitations before a reader can discover them: URL import fails on Cloudflare-fronted sites like NYT Cooking and falls back to reading the page as text, volume-to-weight covers about thirty ingredients, flour density varies by 12% with how you fill the cup, and scaling never rewrites cooking times or step text.",
        "The repository also carries a decision log — including one correction, where the justification I had written for exact fractions turned out to be arithmetically false and had to be replaced with a true one.",
      ],
      learned: [
        "Choosing what to build was worth more than any implementation decision in it. The tempting repair would have produced a competent second copy of a project I already had. Asking what this domain could do that the other one couldn't is what made the rebuild worth doing at all.",
        "Designing for a permanently imperfect component beats chasing the last few percent. The parser will always miss cases. Keeping the original text visible turned that from a defect into a correctable suggestion, and it cost one field.",
        "Refusing to answer is a legitimate feature, and the hardest one to keep. Every refusal here is a place where a plausible number was available and would have been wrong in a way nobody could see.",
        "Running the thing found what the tests could not. Every arithmetic bug was caught by a test; every bug about whether the output was usable by a human — 54 tablespoons, prices embedded in ingredient names, butter listed as \"to taste\" — was caught by opening the app and reading it.",
      ],
    },
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
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Motion",
    ],
    caseStudy: {
      summary:
        "Porting a Supabase-backed, household-shared mobile app into a browser-only demo. Deleting the backend was the design decision, not a compromise — most of the code existed to solve a problem a single-visitor demo does not have.",
      problem: [
        "The original is a real app my household uses: an Expo and React Native grocery list backed by Supabase, with accounts, shared households, invites, live presence, row-level security, and an offline queue. It works, and it stays running.",
        "None of that survives contact with a portfolio link. A visitor arriving from my site would meet an account wall, then an invite flow, then a cold free-tier database — three obstacles before seeing a single list. And a free tier that sleeps after a week of inactivity eventually makes the link look broken rather than idle.",
        "What a demo needs is the opposite of what a shared household app needs. The demo has to be usable within a second of arriving, by one person, with nothing to sign up for and nothing to wait on.",
      ],
      constraints: [
        "No backend, no database, no auth provider, no environment variable — and that as a rule rather than a goal. If a feature appears to need one, the feature does not belong in the demo.",
        "Data should not outlive the visit, which means sessionStorage rather than localStorage. A refresh or a deep link keeps your work; closing the tab clears it.",
        "The repository began as a byte copy of the original, so it still pointed at live infrastructure: the production Supabase project, the live app's Vercel project, and the original git remote. A migration command run from that directory would have hit a production database.",
        "The sign-in screens are worth keeping as an interface, but a fake login on a public site has to say so. Unlabeled, it reads as either broken or deceptive.",
      ],
      approach: [
        "Sever the live connections before writing any code. Archive the original as a branch and a tag so it stays recoverable and reviewable, repoint the remote, delete the deployment link and the environment file, and only then start. Treating that as the blocking first task rather than cleanup was the whole difference between a safe port and an expensive one.",
        "Delete first, scaffold second. Carrying both stacks in one package.json invites React Native and React DOM resolution conflicts for no benefit, and the archive branch already held everything worth keeping. Three files ported nearly verbatim — the barcode lookup, the color palette, and the domain types minus every multi-user field.",
        "Let the constraint do the design work. sessionStorage is scoped per tab, so two tabs are two fully independent instances of the app. That is exactly the standalone behavior a demo needs, and it arrived for free: no tenancy model, no household id on anything, no row-level security, no presence.",
      ],
      implementation: [
        "Next.js 16 on the App Router with React 19, TypeScript strict, Tailwind v4, shadcn/ui for primitives, Zustand for state, and Motion for gestures and layout animation. The whole app is client-side; the root layout stays a server component only for metadata and fonts.",
        "About 900 lines of realtime, offline, and tenancy machinery — the household, lists, and presence providers, the member and network-status hooks, the offline queue — collapsed into a single store of roughly 150. That is the clearest measure of how much of the original existed to serve multi-user sync rather than the actual product.",
        "The old app's iOS palette mapped almost one-to-one onto shadcn's token names, so it ported directly into CSS custom properties: the light set on the root, the dark set under both an explicit class and the system preference. One responsive shell handles both breakpoints — a grid that is a single column on phones and a sidebar plus detail pane above it, with the same routes behind both rather than duplicated screens.",
        "First load is seeded with a populated list: items across three tags, a couple already checked, quantities and units filled in. A portfolio link that opens onto an empty state hides every feature the app has. The seed uses a fixed timestamp rather than the current time, so ordering is deterministic and the server and client cannot disagree on hydration.",
        "Storage is never read during render. The store skips automatic hydration and rehydrates in an effect, components render a skeleton until it lands, and the hydration and mount flags are exposed through useSyncExternalStore rather than state set in an effect — which is both SSR-correct and what the React Compiler's lint rules require.",
        "Barcode scanning uses the native detector in Chrome, Edge, and Android at zero bundle cost, and falls back to a zxing decoder that is dynamically imported so it only loads when someone actually taps Scan. Where the camera is unavailable or permission is denied, the Scan button is not rendered at all — a button that throws is worse than no button. The product lookup against Open Food Facts ported unchanged, since it was always a plain CORS-enabled request with no database behind it.",
        "The demo auth validates that credentials look like credentials and stores no password, hashed or otherwise. There is nothing to authenticate against, so keeping one would be pure liability. Every auth screen carries a permanent line saying no account is created and nothing is sent to a server, and the old settings copy promising that your data is securely stored is gone — it would have been false here.",
      ],
      challenges: [
        "The duplicate rule lost the thing that enforced it. An unchecked item cannot appear twice in the same list, and in the Supabase version that was guaranteed twice over — a unique partial index in Postgres plus a check in the interface. The index went with the database, so the store became the only place the invariant can live. It is enforced on adding and on renaming, the rename case excluding the item being renamed, and deliberately not re-implemented in any component: two enforcement points that can disagree is worse than one that cannot.",
        "Swipe-to-delete was free on React Native and hostile on the web. Rebuilding the gesture with a drag constrained to one axis was straightforward; the problem is that a swipe is unusable with a mouse and invisible to a keyboard, and most portfolio visitors are on a laptop. So the row body is also a button that opens the edit dialog, the dialog carries Delete, and desktop gets hover-revealed controls on top. Every destructive action has a keyboard path, and the gesture is an enhancement rather than the way in.",
        "The performance claim was asserted for a while before it was measured, and the first attempt to measure it was wrong in a way that looked right. It identified libraries by grepping the built output for internal identifiers — names that minification renames — and concluded that two libraries were in zero chunks. They had been in the bundle the entire time. Redoing it from source maps produced numbers that were roughly the same shape and specifically different.",
        "The share metadata looked complete and was not. Title, description, site name, type, and a Twitter card were all present; the image and the base URL were missing. The card type declared was the one that promises a large preview image, which made the omission worse than declaring nothing — a shared link rendered as a bare text card instead of the compact card the smaller type would have produced.",
      ],
      solution: [
        "First-load JavaScript, gzipped, went from 731 kB on every route to between 199 and 257 kB depending on the route. The method matters more than the number: build both versions, serve them, and count only what the served HTML actually tells the browser to fetch, attributing libraries from source maps rather than from the minified text.",
        "The honest caveat is in the repository next to the numbers. That comparison is not like-for-like — the old bundle also carried the Supabase client, realtime subscriptions, the offline queue, and the household model, all of which the demo deleted rather than ported, so some unknown share of the reduction is scope rather than tooling. And most of the win is route splitting rather than the framework: the old export produced a single entry bundle with no splitting at all, so every visitor downloaded the barcode scanner, the settings screen, and the onboarding flow in order to look at a sign-in form.",
        "The three specific bundle claims were checked individually rather than assumed. The icon library tree-shakes, with 21 icon modules reaching the build out of roughly 1,500 shipped. The zxing decoder stays in a chunk no route's first load references. The animation library is out of the initial payload on three routes of four — it loads immediately on the item view, which is correct rather than a regression, since that route's drag and animated reorder are visible right away.",
      ],
      outcome: [
        "The demo opens onto a working, populated list with no account, no waiting, and nothing to provision. Installing dependencies and starting the dev server is the entire setup — there are no environment variables to get wrong, which is a genuine simplification rather than a limitation to apologize for.",
        "The original household app is untouched and still running, and the pre-port implementation is preserved on an archive branch and tag, so the comparison the case study rests on is reproducible by anyone who clones the repository.",
        "The port is written up as a decision record rather than a changelog, including the parts that went wrong — the mismeasured bundle, the metadata that shipped incomplete, and the features deliberately dropped along the way, such as voice input, which removed roughly 600 lines, a microphone permission prompt, and a browser support gap.",
      ],
      learned: [
        "Removing infrastructure can be the feature. Roughly 900 lines of sync, presence, and tenancy code existed to solve a problem this audience does not have, and deleting it made the app faster to load, faster to open, and dramatically simpler to reason about. The instinct to treat a backend as a sign of seriousness is worth resisting when nothing in the product needs one.",
        "A well-chosen constraint pays twice. sessionStorage was picked for one reason — data should not outlive the visit — and it happened to deliver per-tab isolation, which is what made the entire multi-user model unnecessary rather than merely unused. That is worth looking for deliberately: the constraint that also answers a question you had not gotten to yet.",
        "An unverified performance number is a liability, and the obvious way to verify it can be confidently wrong. Keying on identifiers that minification renames produced a clean, plausible, completely incorrect result. Any conclusion that could have come out of a text search over built output deserves suspicion; the build's own source maps are the source of truth.",
        "Honest labeling is part of the engineering. The single most important line removed in this port was a settings screen claiming data was securely stored. It was inherited, it was false in the new context, and it is exactly the kind of thing a careful reviewer notices first.",
      ],
    },
  },
];

module.exports = { projects, CASE_STUDY_SECTIONS };
