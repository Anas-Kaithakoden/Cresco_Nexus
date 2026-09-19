# Cresco Nexus — Website

Static, multi-page website for **Cresco Nexus**, a student-led learning community at Jamia Nadwiyya Arts and Science College (JNASC), Edavanna. Growth through connection.

## Pages

| Page | Route |
| --- | --- |
| Home | `index.html` |
| About | `about.html` |
| Programs | `programs.html` |
| Team | `team.html` |
| Pilot Plan (3-month roadmap) | `pilot.html` |
| Join & Contact (registration form) | `join.html` |

All content is sourced from `CRESCO_NEXUS_Full_Working_Plan.pdf` (the project's working plan).

## Stack

- Plain HTML5 + CSS3 + vanilla JavaScript — no build step, no dependencies.
- Fonts via Google Fonts: **Crimson Pro** (headings) + **Atkinson Hyperlegible** (body).
- Validation-ready palette (WCAG AA): navy `#1E3A5F` primary, green `#16803E` accent.
- Progressive enhancement only: scroll-reveal and mobile nav are JS; content works without it.

## Project structure

```
cresco_nexus/
├── index.html          Home
├── about.html          Vision, philosophy, learning cycle
├── programs.html       Learning areas, progression, One Skill
├── team.html           Faculty + student core team
├── pilot.html          Month-by-month pilot plan
├── join.html           Membership, onboarding, registration form
└── assets/
    ├── css/styles.css  Design system + components
    ├── js/main.js      Nav, reveal, form handling
    ├── logo-96.png     Header + footer brand mark (derived from logo.png)
    └── favicon.png     Site icon (derived from logo.png)
```

## Run locally

Serve the folder over HTTP (the forms and Google Fonts load over HTTPS):

```sh
python -m http.server 8000
```

then open `http://localhost:8000`.

## Connect the form (Formspree)

1. Create a free form at <https://formspree.io/>.
2. Copy your endpoint ID, e.g. `mzbnvxyz`.
3. In `join.html`, replace the placeholder action:

```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

The form posts to Formspree, which emails submissions to the address you configure. Until the ID is replaced, the site shows an informational message instead of submitting.

## Deployment (GitHub Pages)

1. Push this folder to a repository, e.g. `your-username/cresco-nexus`.
2. In the repo → **Settings → Pages**: deploy from branch, folder `/ (root)`.
3. The site will be live at `https://<your-username>.github.io/cresco-nexus/`.

### Before going live, replace placeholders

- `YOUR_FORM_ID` in `join.html` — the Formspree form ID.
- `YOUR_USERNAME` — the og:url and canonical URLs in every page `<head>`.
- `#` social links — point them at the real GitHub / LinkedIn / Instagram pages.
- `hello@cresconexus.in` — the contact email.

## Accessibility

- Semantic landmarks and one `h1` per page; skip-link provided.
- Visible focus states; labels tied to inputs; `aria-live` on form status.
- Full keyboard access (mobile nav closes on `Escape`).
- Respects `prefers-reduced-motion`.

## Credits

Designed and built for the Cresco Nexus working plan (JNASC, Edavanna).