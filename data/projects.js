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

module.exports = { projects, CASE_STUDY_SECTIONS };
