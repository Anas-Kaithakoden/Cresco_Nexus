# Session Context — Cresco Nexus Website

> Stored so the next session can continue without losing context. The static website is **complete and verified**; only optional polish and placeholders remain.

## What this project is
A static, multi-page website for **Cresco Nexus**, a student-led learning community at Jamia Nadwiyya Arts and Science College (JNASC), Edavanna, Malappuram, Kerala. Content source of truth: `CRESCO_NEXUS_Full_Working_Plan.pdf`. So far the PDF text copy (`_pdf_text.txt`) was created then **deleted** — re-extract with pypdf if needed: `python -m pip install pypdf` then `PdfReader(...).pages` text.

## Final file tree
```
cresco_nexus/
├── index.html        Home (hero motif, learning cycle, 8 offers, One Skill steps, CTA)
├── about.html        Vision, philosophy, cycle id="cycle"
├── programs.html     Areas, progression id="progression", one-skill id="one-skill"
├── team.html         Faculty + 7 core team members
├── pilot.html        3-month plan + typical month + week-by-week
├── join.html         Onboarding id="onboarding" + Formspree form
├── logo.png          Master logo (1024×1024, white bg, navy artwork) — source file, not referenced by pages
├── README.md         Local run + GitHub Pages deploy + Formspree setup
└── assets/
    ├── css/styles.css   Design system (~295 CSS rules, braces balanced)
    ├── js/main.js       Nav, scroll reveal, Formspree handler, checkbox validation
    ├── logo-96.png      Optimized downscale used in header (38px) + footer (56px)
    └── favicon.png      Optimized downscale (64px) used as the site icon on every page
```
Verified: every page has exactly 1 `</html>`, 1 `<h1>`, 1 `<body>`, 1 `<main>`; all pages import `assets/css/styles.css`, `assets/js/main.js`; footer anchor targets (`about.html#cycle`, `programs.html#one-skill`, `programs.html#progression`, `join.html#onboarding`) all exist. No leftover `__PART_*__` markers. CSS braces balanced (295/295). Brand mark: header uses `<img class="brand__logo">`, footer uses `<img class="footer-brand__logo">`, favicon is `assets/favicon.png`; legacy `assets/favicon.svg` deleted.

## Design system (WCAG AA verified)
- Primary navy `#1E3A5F` (11.5:1 on white), accent green `#16803E` (5.01:1), navy-deep `#142942`, navy-ink `#16304F`, navy-soft `#EDF1F6`.
- Bg `#FAF9F5`, bg-soft `#F3F1EA`, slate `#475569` (7.19:1), muted `#5B6B7C` (5.19:1), border `#E4E1D8`, card `#FFFFFF`, focus `#2563EB`.
- Fonts: **Crimson Pro** (serif headings) + **Atkinson Hyperlegible** (sans body) via Google Fonts — "Academic/Research" pairing from the `ui-ux-pro-max` skill.
- Sections: navy bands use `.section--navy`; byline/eyebrow style `.eyebrow`, `.eyebrow--center`, `.eyebrow--on-dark`. Scroll reveal `.reveal` + `.is-visible` (respects `prefers-reduced-motion`).

## The 7 core team members (from the PDF)
- **Sumayya Farhana KP** — Faculty Coordinator
- **Anas** — Student Lead
- **Muhammed Suhail P** — Vice Lead & Treasurer
- **Afnan** — Learning Coordinator
- **Hanan P.T.** — Activity Coordinator
- **Shadhi Maliyekkal** — Community Coordinator
- **Razal Naz** — Outreach Coordinator
- **Binyameen C** — Media & Documentation
- General members — learners/contributors/speakers/mentors; governance = student-led with faculty supervision.

## Pilot plan (pilot.html)
- Month 1 Discover ("What Can You Do With Your Degree?" + exploration quiz; One Skill selection + learning plan).
- Month 2 Learn ("How to Find Good Resources and Build a Learning Roadmap" + resource-hunt).
- Month 3 Build & Share ("From Learning to Practical Project" + mini-project challenge or showcase).
- Standard monthly rhythm: W1 Plan / W2 Learn / W3 Apply / W4 Share & Review. After pilot: review to Faculty Coordinator.

## Form & placeholders still to replace before public launch
1. **`YOUR_FORM_ID`** in `join.html` — the `<form action="https://formspree.io/f/YOUR_FORM_ID">`. Until replaced, JS shows an informational status instead of submitting (placeholder logic in main.js, `PLACEHOLDER = "YOUR_FORM_ID"`). README explains the Formspree steps.
2. **`YOUR_USERNAME`** — og:url + canonical on every page (`https://YOUR_USERNAME.github.io/cresco-nexus/...`).
3. **`#` social links** — GitHub / LinkedIn / Instagram in every footer.
4. **`hello@cresconexus.in`** — placeholder contact email (used in mailto links, social rows, contact-card).

## Form behavior (main.js)
- Fields: name, email, department (select), year (select), interests (12 chip checkboxes, grouped `name="interests"`, one-required validated in JS), experience (radio required), skills_contribute / skills_develop (optional), message (optional).
- `data-label="Submit registration"` on the submit button restores the label after submit.
- submit → FormData + fetch POST to Formspree; sets `_subject`; updates `.form-status` (`is-visible`, `--info/--success/--error`) with `aria-live`/`role=status`.

## Useful commands
- Serve locally: `python -m http.server 8000` (run from project root).
- No build step, no package.json, no tests/lint configured.

## Recent changes
- Logo rollout: replaced the inline-SVG header mark and the favicon with the new official logo (`logo.png`, untracked master at repo root). Optimized downscales in `assets/`: `logo-96.png` (header `.brand__logo` 38px + footer `.footer-brand__logo` 56px) and `favicon.png` (64px, now the site icon). Both `<img>` marks are decorative (`alt=""` / `aria-hidden`); adjacent brand text + link aria-label carry the name. Delete legacy `assets/favicon.svg` after confirming no references.
- Hero chip (balance): see note above.
- Hero chip (`index.html` / `styles.css`): the "One Skill. One Month." chip was floating disconnected at the bottom-left of the motif (negative left margin). Now `align-self: center`, centered on the Grow node axis, tucked up with `margin-top: -2.2rem`, and gets a bubble-tail notched connector via `.hero__chip::after`. Also moved `aria-hidden` from the `.hero__motif` wrapper to the SVG so the chip text is screen-reader accessible. Verified at 1440 and 1150 px (centered, no diagram node/label covered, no overflow). Still hidden below 1100 px.

## If continuing next time
1. Optionally run an HTML validator (e.g. `npx html-validate`) or a lighthouse pass for accessibility.
2. Optionally replace placeholders (above) when real values are known.
3. Explicitly requested by user earlier: if the next session is a fresh one, this `session.md` is the context handoff — update it at the end of each session.