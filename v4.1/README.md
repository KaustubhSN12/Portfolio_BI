<<<<<<< HEAD
# Power BI Portfolio — Kaustubh Narayankar

Personal portfolio site built to support applications for Power BI Developer,
Business Intelligence Developer, Data Analyst, and Data Scientist roles.

## Status: Version 3 — Case Studies, Gallery & Contact Form

- [x] V1 — basic hero, about, skills, projects, contact
- [x] V2 — design system (navy/yellow/teal + Space Grotesk/Inter/JetBrains Mono),
      animated hero "live dashboard" mock, Experience & Education timeline,
      glassmorphism cards, animated skill meters, mobile nav, scroll reveals
- [x] V3 — individual project case-study pages (`/projects`), dashboard screenshot
      gallery with lightbox, working contact form (Formspree), GitHub stats section
- [ ] V4 — performance/SEO/accessibility polish, custom domain, GitHub Pages deploy

## Structure

```
index.html         → homepage markup
style.css           → design tokens + homepage component styles
script.js           → nav, reveals, counters, meters, hero chart, tilt, form, lightbox
projects/
  deloitte.html     → Deloitte case study
  pwc.html          → PwC Switzerland case study
  hr-analytics.html → HR Analytics case study
  project.css       → shared case-study page styles (loaded alongside ../style.css)
images/
  profile.png       → hero photo (add your own)
  projects/
    deloitte/01.png, 02.png, 03.png       → screenshots (add your own)
    pwc/01.png, 02.png, 03.png            → screenshots (add your own)
    hr-analytics/01.png, 02.png, 03.png   → screenshots (add your own)
resume/resume.pdf  → resume file
```

## Before you publish — things to personalize

- `images/profile.png` — hero photo
- `resume/resume.pdf` — resume file
- **Dashboard screenshots** — drop PNGs into `images/projects/<project>/01.png`, `02.png`, `03.png`.
  Until they exist, each gallery slot shows a clean placeholder automatically — no broken-image icons.
- **Contact form** — sign up at [formspree.io](https://formspree.io), create a form, then replace
  `YOUR_FORM_ID` in `index.html`'s `<form action="https://formspree.io/f/YOUR_FORM_ID">` with your real ID.
  Until you do, submitting the form shows a friendly inline message instead of failing silently.
- **GitHub section** — replace `your-github` in the three URLs inside the `#github` section of
  `index.html` with your actual GitHub username (used for the live stats/streak images).
- LinkedIn / GitHub URLs in the Contact and Footer sections (currently placeholders)
- Certification card details in `#certifications` (exact titles/links)
- Skill meter percentages in `#skills` (currently self-assessed placeholders)
- Timeline date labels in `#journey` (currently relative labels, no fabricated years)

## Running locally

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → Deploy from branch → `main` / root.
3. Site goes live at `https://<username>.github.io/<repo>/`.
=======
# Portfolio_BI
>>>>>>> 3e667827f42c59eb0d503476176bcf7fe7cfaa66
