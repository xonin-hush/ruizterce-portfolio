/**
 * Long-form copy for the work detail pages, ported verbatim from the main
 * site's src/content/case-studies.ts — keep the two in sync when either edits.
 *
 * Card titles and one-liners stay in the i18n locale; everything here is
 * detail-page-only, so nothing is duplicated across the two sources.
 *
 * Studies without photos render their diagram and no gallery: Test Automation
 * has no product screenshots in the repo.
 */

const photo = (slug, name, objectPosition) => ({
  src: `/img/work/${slug}/${name}.webp`,
  thumb: `/img/work/${slug}/${name}-thumb.webp`,
  objectPosition,
});

/**
 * Screenshots are page-shaped — far wider (or taller) than the 4:3 photo tiles.
 * `fit: "contain"` letterboxes them in the grid so the whole frame survives
 * instead of being cropped to an unreadable band.
 */
const shot = (slug, name) => ({ ...photo(slug, name), fit: "contain" });

export const caseStudies = [
  {
    slug: "scanner-bridge",
    category: "work",
    titleKey: "project_1_t",
    title: "Scanner Bridge — Web-to-Hardware Document Capture",
    tagline:
      "A multi-layered bridge that lets web apps drive physical document scanners over TWAIN/WIA and WebSockets.",
    role: "Frontend Developer, R&D",
    org: "Aswar Group",
    timeframe: "Jun 2025 — Jul 2026",
    tech: ["Python", "Vanilla JS", "WebSockets", "TWAIN", "WIA", "Tailwind CSS"],
    diagram: "scanner-bridge",
    problem: [
      "Browsers are sandboxed away from hardware for good reasons — but enterprise document intake still runs on physical scanners. Teams were stuck switching between vendor desktop utilities and the web systems where documents actually needed to land, with no unified path from glass to database.",
      "The challenge: give a web application first-class access to scanner hardware, across vendors, without asking users to leave the page.",
    ],
    myRole: [
      "I designed and built Scanner Bridge inside Aswar Group's R&D department, owning the solution across every layer — from the Python service that speaks to the scanner drivers up to the zero-dependency vanilla-JavaScript interface built for operators.",
    ],
    approach: [
      "The architecture is a layered bridge. At the bottom, a local Python service speaks TWAIN and WIA — the two protocols that between them cover virtually every document scanner in the field. Above it, a WebSocket channel streams scanner control and captured pages to the browser in real time. At the top, the web app exposes a single, unified digital intake workflow: scan, review, and submit without touching another program.",
      "Reliability got as much attention as the happy path: an in-process supervisor and an external watchdog restart the bridge after crashes, a single-instance lock keeps duplicates from fighting over the scanner, and the WebSocket layer enforces an origin allow-list and per-scan timeouts so a hung driver can never wedge the service.",
      "Building it meant living in two worlds at once — debugging decades-old driver protocol quirks in the morning, refining a fast, dependency-free browser UI in the afternoon. That contrast is exactly what made the project fun.",
    ],
    outcome: [
      "Scanner Bridge turns document capture into a native-feeling web experience: scanning directly into the browser through one consistent workflow, regardless of scanner vendor.",
      "The same R&D role has me building Vue.js frontends integrated with Milestone XProtect surveillance systems — another case of web interfaces meeting serious hardware.",
    ],
    gallery: [
      photo(
        "scanner-bridge",
        "team-anniversary",
      ),
      photo(
        "scanner-bridge",
        "team-celebration",
      ),
    ],
  },
  {
    slug: "heritage-iraq",
    category: "work",
    titleKey: "project_7_t",
    title: "Heritage Iraq — 3D Interactive Heritage Explorer",
    tagline:
      "A browser-based 3D map of Iraq's heritage sites with a six-era timeline and walkable multiplayer worlds — no install, just a link.",
    role: "Creator & Developer",
    org: "Personal project",
    timeframe: "Jan 2026 — Jul 2026",
    tech: ["TypeScript", "Babylon.js", "Colyseus", "WebSockets", "Vite", "Web Audio API"],
    liveUrl: "https://heritage.alqaba.com/",
    hero: photo(
      "heritage-iraq",
      "map-overview",
    ),
    problem: [
      "Iraq's heritage usually reaches the world as static photos and scattered articles — formats that flatten five millennia into something you scroll past. After a year of heritage work with universities and centers, I wanted to build the missing front door: one place to see where these sites stand, when they mattered, and what it feels like to walk them.",
      "And it had to run in a browser tab on any device — no install, no gaming PC, no patience required.",
    ],
    myRole: [
      "Heritage Iraq is my personal project, built end to end: the 3D map, the era timeline, the multiplayer worlds, and the performance work that keeps it all smooth. A collaborator prototyped an experimental AI tour guide along the way; the core experience — from first commit to production deploy — is mine.",
    ],
    approach: [
      "The centerpiece is a Babylon.js map of Iraq with fourteen heritage sites — from the Ziggurat of Ur to Mosul's Al-Hadba Minaret — each placed as its own 3D model along the Tigris and Euphrates. A draggable timeline moves through six eras, from Sumerian to modern Iraq: sites appear in their period, an era card carries the history, and a GPU-particle cloud storm sweeps the map between eras, scored by a wind whoosh synthesized live in the Web Audio API — no audio files anywhere in the project.",
      "Select sites open into first-person walkable worlds with a hand-rolled character controller: collisions, gravity, pointer-lock look on desktop, a touch joystick on phones. The worlds are shared — a Colyseus server over WebSockets puts every visitor in the same room, with remote players smoothly interpolated from throttled position updates, floating nameplates, and an emote system. When the server is unreachable, the experience degrades gracefully to solo exploration.",
      "Keeping a 3D world at full frame rate inside a browser tab meant treating performance as a feature: device-pixel-ratio capped on high-DPI screens, materials and world matrices frozen on the static map, ray picking restricted to site markers, and rendering suspended when the tab is hidden. The best war story: a glTF loader that deadlocked only in production builds — traced to Vite's code splitting and fixed by registering the loader statically.",
    ],
    outcome: [
      "Heritage Iraq is live at heritage.alqaba.com: an explorer where visitors don't just read about Iraq's past — they scrub through it, fly over it, and walk through it together, on anything from a workstation to a phone.",
    ],
    gallery: [
      shot(
        "heritage-iraq",
        "timeline-sumerian",
      ),
      shot(
        "heritage-iraq",
        "site-detail",
      ),
      shot(
        "heritage-iraq",
        "mobile-map",
      ),
    ],
  },
  {
    slug: "discover-mosul",
    category: "work",
    titleKey: "project_2_t",
    title: "Discover Mosul — Heritage Platform & CMS",
    tagline:
      "A standalone landing page for Al-Noor University's heritage center, and the admin dashboard its staff use to run the Discover Mosul mobile app.",
    role: "Frontend Developer",
    org: "Al-Noor University Center for the Preservation of Cultural Heritage",
    timeframe: "Jan 2025 — Jun 2025",
    tech: ["Astro", "Laravel", "Filament", "Role-based auth", "Tidio AI chat"],
    liveUrl: "https://center.alnoor.edu.iq",
    diagram: "discover-mosul",
    problem: [
      "Mosul's heritage deserves a modern digital front door. The Alnoor Center needed two different things: a public page that presents the center to the world, and a way for its own staff to keep the Discover Mosul mobile app stocked with heritage sites and content — without a developer in the loop every time something changed.",
    ],
    myRole: [
      "I built both, as two separate systems for two separate audiences: the public landing page, and the internal dashboard standing behind the mobile app.",
    ],
    approach: [
      "The landing page is a standalone Astro site. It's static and responsive by design, with no backend behind it — its whole job is to present the center clearly and load fast on any device, so there's nothing to go down.",
      "The dashboard is the other half, and a different stack entirely: Filament on Laravel. It's where the center's staff sign in to add heritage sites and manage the content the mobile app serves, with role-based authentication and user management deciding who can change what. Building on Filament meant starting from a production-grade admin panel instead of hand-rolling CRUD screens and a permissions layer.",
      "I also integrated Tidio's AI-powered live chat into the center's mobile app, giving visitors an immediate conversational channel.",
    ],
    outcome: [
      "Two systems, each doing one job well: a fast public page anyone can reach, and a permission-aware dashboard through which the team keeps the mobile app's heritage content current on their own.",
    ],
    // Public landing page only — the dashboard and CMS sit behind authentication,
    // so the diagram carries that half of the story.
    gallery: [
      shot(
        "discover-mosul",
        "landing-hero",
      ),
      shot(
        "discover-mosul",
        "values-section",
      ),
      shot(
        "discover-mosul",
        "our-work",
      ),
      shot(
        "discover-mosul",
        "news-announcements",
      ),
      shot(
        "discover-mosul",
        "dark-theme",
      ),
      shot(
        "discover-mosul",
        "mobile-responsive",
      ),
    ],
  },
  {
    slug: "marshes-3d",
    category: "event",
    titleKey: "project_3_t",
    title: "Digitizing the Al-Chibayish Marshes",
    tagline:
      "Photogrammetry fieldwork in a UNESCO World Heritage wetland — and the web platform that brings the captured 3D models to everyone.",
    role: "Digital & technical contributor (student researcher)",
    org: "University of Mosul × Thi-Qar × German partner universities",
    timeframe: "Nov 2025",
    tech: ["Photogrammetry", "Insta360 X5", "Interactive 3D", "Responsive web", "360° imaging"],
    hero: photo(
      "marshes-3d",
      "hero-boat-capture",
    ),
    problem: [
      "The Iraqi Marshes — a UNESCO World Heritage Site often called the cradle of civilization's wetlands — face environmental pressure that makes systematic digital documentation urgent. An international, multi-university project set out to capture them before change outpaces the record.",
      "Documentation only matters if people can reach it. The project needed both field data capture and a web presence capable of presenting interactive 3D results to researchers and the public.",
    ],
    myRole: [
      "I joined the fieldwork team in southern Iraq and focused on the digital and technical components: capturing photogrammetry data in the Marshes and improving the project's website to carry the results.",
    ],
    approach: [
      "In the field, I captured photogrammetry data using the Insta360 X5 and mobile-based 360° imaging — from boats moving through water channels and reed landscapes that no tripod-friendly environment resembles. The trip also took us through the ancient city of Ur and its Great Ziggurat, a reminder of how deep the region's record runs.",
      "On the web side, I optimized the project site's responsiveness and embedded interactive 3D models directly into the documentation flow, so captured geometry became something visitors can actually explore rather than a file in an archive.",
    ],
    outcome: [
      "Field data from a UNESCO World Heritage wetland, captured and flowing into an interactive web platform — and proof that the same person can hold a camera on a boat and refine the CSS that presents what it saw.",
      "The collaboration continued into laser-scanning work in Germany the following month.",
    ],
    gallery: [
      photo(
        "marshes-3d",
        "project-kickoff",
      ),
      photo(
        "marshes-3d",
        "boat-thumbs-up",
      ),
      photo(
        "marshes-3d",
        "ur-ziggurat-group",
      ),
      photo(
        "marshes-3d",
        "thiqar-stage-group",
      ),
      photo(
        "marshes-3d",
        "mosul-team-seated",
      ),
      photo(
        "marshes-3d",
        "seminar-audience",
      ),
      photo(
        "marshes-3d",
        "candid-laptop-smile",
      ),
    ],
  },
  {
    slug: "brandenburg-scan",
    category: "event",
    titleKey: "project_4_t",
    title: "Laser-Scanning the Brandenburg Museum",
    tagline:
      "Hands-on terrestrial laser scanning and point-cloud processing during an international project week in Germany.",
    role: "3D Documentation & Data Processing (student researcher)",
    org: "Brandenburg University of Applied Sciences × University of Mosul",
    timeframe: "Dec 2025",
    tech: ["FARO Focus", "Terrestrial laser scanning", "Point clouds", "3D data processing"],
    hero: photo(
      "brandenburg-scan",
      "hero-360-cloister",
      "center 70%"
    ),
    problem: [
      "Precise 3D documentation of heritage interiors demands survey-grade tools and the discipline to use them well. The project week in Brandenburg was the point where months of preparation — including the Marshes fieldwork — met professional-grade equipment in a real museum.",
    ],
    myRole: [
      "I worked on the technical and digital track of the project: 3D documentation and data processing, as part of an international team spanning the universities of Mosul, Thi-Qar, Tishk, and German partners.",
    ],
    approach: [
      "We trained hands-on with the FARO Focus terrestrial laser scanner, then applied it directly in fieldwork at the Brandenburg Museum — planning scan positions, capturing the interiors, and processing the resulting point clouds into detailed 3D models of the museum spaces.",
      "The work was exacting in the best way: a misplaced scan position or sloppy registration shows up immediately in the merged cloud. Precision isn't a virtue here, it's the deliverable.",
    ],
    outcome: [
      "Detailed 3D models of the Brandenburg Museum's spaces, built from scans our team captured and processed — and a toolset (terrestrial laser scanning, registration, point-cloud processing) that now travels back to Iraq's own documentation work.",
    ],
    gallery: [
      photo(
        "brandenburg-scan",
        "data-processing",
      ),
      photo(
        "brandenburg-scan",
        "seminar-room",
      ),
      photo(
        "brandenburg-scan",
        "walkthrough-slide",
      ),
      photo(
        "brandenburg-scan",
        "team-presentation",
      ),
      photo(
        "brandenburg-scan",
        "brandenburg-old-town",
      ),
      photo(
        "brandenburg-scan",
        "project-team",
      ),
      photo(
        "brandenburg-scan",
        "graduation-group-photo",
      ),
      photo(
        "brandenburg-scan",
        "team-dinner",
      ),
      photo(
        "brandenburg-scan",
        "reception-attendees",
      ),
      photo(
        "brandenburg-scan",
        "team-mirror-selfie",
      ),
      photo(
        "brandenburg-scan",
        "santa-hat-selfie",
      ),
      photo(
        "brandenburg-scan",
        "chandelier-duo",
      ),
      photo(
        "brandenburg-scan",
        "santa-hat-portrait",
      ),
      photo(
        "brandenburg-scan",
        "misty-park-walk",
      ),
      photo(
        "brandenburg-scan",
        "foggy-night-path",
      ),
    ],
  },
  {
    slug: "vr-gallery-potsdam",
    category: "event",
    titleKey: "project_5_t",
    title: "VR Heritage Gallery at GI-Festival 2025",
    tagline:
      "An immersive VR gallery bringing ancient Iraqi life to a German informatics festival, built with the University of Mosul.",
    role: "VR Gallery Contributor",
    org: "University of Mosul · GI-Festival 2025, University of Potsdam",
    timeframe: "Sep 2025",
    tech: ["VR", "AR", "3D content", "Digital heritage"],
    hero: photo(
      "vr-gallery-potsdam",
      "hero-vr-gallery",
    ),
    problem: [
      "How do you make ancient Iraqi life feel present to an audience in Potsdam? The Digitalisation of Cultural Heritage workshop at GI-Festival 2025 (INFORMATIK 2025) was the stage — the challenge was building an experience, not a slideshow.",
    ],
    myRole: [
      "I contributed to the University of Mosul's VR Gallery — an immersive scenario showcasing how technology can bring cultural heritage to life — presented alongside Al-Noor University's AR-Gallery launch at the workshop.",
    ],
    approach: [
      "The gallery put visitors inside reconstructed scenes of Iraqi heritage through VR headsets, turning archaeological and cultural material into something walkable. Presenting it live at an international festival meant the experience had to hold up to a continuous stream of first-time users — the hardest QA environment there is.",
      "The week was also a masterclass in the wider field: talks from the leadership of the German Informatics Society, exchanges with international digital-heritage experts, and connections that carried directly into the Marshes and Brandenburg projects.",
    ],
    outcome: [
      "A working VR gallery demonstrated at GI-Festival 2025, supported by DAAD and Brandenburg University of Applied Sciences — and the start of an international collaboration thread that ran through the rest of the year.",
    ],
    gallery: [
      photo(
        "vr-gallery-potsdam",
        "festival-stage-group",
      ),
      photo(
        "vr-gallery-potsdam",
        "ilgamesh-demo",
      ),
      photo(
        "vr-gallery-potsdam",
        "gallery-corridor",
      ),
      photo(
        "vr-gallery-potsdam",
        "workshop-prep",
      ),
      photo(
        "vr-gallery-potsdam",
        "closing-session",
      ),
      photo(
        "vr-gallery-potsdam",
        "festival-portrait",
      ),
      photo(
        "vr-gallery-potsdam",
        "signed-badge",
      ),
      photo(
        "vr-gallery-potsdam",
        "mosul-vr-poster-team",
      ),
      photo(
        "vr-gallery-potsdam",
        "vr-booth-lineup",
      ),
      photo(
        "vr-gallery-potsdam",
        "soon-demo-room",
      ),
      photo(
        "vr-gallery-potsdam",
        "auditorium-group-backdrop",
      ),
      photo(
        "vr-gallery-potsdam",
        "lobby-lanyard-trio",
      ),
      photo(
        "vr-gallery-potsdam",
        "reichstag-group",
      ),
      photo(
        "vr-gallery-potsdam",
        "brandenburg-gate-group",
      ),
      photo(
        "vr-gallery-potsdam",
        "gothic-brick-church",
      ),
      photo(
        "vr-gallery-potsdam",
        "campus-portrait",
      ),
      photo(
        "vr-gallery-potsdam",
        "station-platform",
      ),
    ],
  },
  {
    slug: "qaf-testing",
    category: "work",
    titleKey: "project_6_t",
    title: "Frontend Test Automation & CI/CD at QAF Lab",
    tagline:
      "A comprehensive frontend test suite — unit, integration, and E2E — wired into CI/CD with mocking and performance checks.",
    role: "Frontend Developer",
    org: "QAF Lab",
    timeframe: "Jun — Sep 2025",
    tech: ["Unit testing", "Integration testing", "E2E", "CI/CD", "Mocking", "Performance checks"],
    diagram: "qaf-testing",
    problem: [
      "A frontend without tests is a frontend you're afraid to change. QAF Lab needed confidence: a safety net that catches regressions before users do, running automatically on every change.",
    ],
    myRole: [
      "I owned the frontend testing effort — writing the suite, structuring it for maintainability, and automating it in the delivery pipeline.",
    ],
    approach: [
      "I built coverage across the full pyramid: fast unit tests at the base, integration tests across component boundaries, and end-to-end tests exercising real user flows at the top. External dependencies were mocked for determinism, performance checks guarded against regressions, and the whole suite ran in CI/CD on every push.",
      "Just as much of the work was care: refactoring tests to stay readable, killing flakiness, and treating test code with the same standards as production code.",
    ],
    outcome: [
      "A comprehensive, automated test suite the team could trust — failures that mean something, green runs that mean more, and a pipeline that enforces it all without anyone having to remember.",
    ],
    gallery: [],
  },
];

export const bodySections = [
  { key: "problem", labelKey: "work_problem" },
  { key: "myRole", labelKey: "work_myRole" },
  { key: "approach", labelKey: "work_approach" },
  { key: "outcome", labelKey: "work_outcome" },
];

export const getCaseStudy = (slug) => caseStudies.find((cs) => cs.slug === slug);

// Which landing-page section each category opens on — must match FullPage's
// `sections` order: Welcome(0), Work(1), Events(2), Contact(3), Resume(4).
export const sectionForCategory = { work: 1, event: 2 };

// Studies sharing a category, in author order — used to build a tab's cards and
// to keep a detail page's prev/next within its own tab.
export const studiesByCategory = (category) =>
  caseStudies.filter((cs) => cs.category === category);
