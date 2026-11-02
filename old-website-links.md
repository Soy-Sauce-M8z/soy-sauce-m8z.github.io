# Old website: sthiruveedula.netlify.app

Scraped on 2026-11-02. The original site was a single page with anchor navigation, built from a
generic portfolio template (swiper carousel, scroll-reveal, EmailJS contact form).

## Internal links (anchor sections on the one-pager)

| Old link | Section | New status |
| --- | --- | --- |
| `#home` | Hero: "Hello, I'm Sai Thiruveedula, a CS Major" | Rebuilt on `/` |
| `#skills` | Skills: Languages + Softwares | Rebuilt on `/` |
| `#qualifications` | Qualification: education timeline + work tab (empty) | Rebuilt on `/` as "Journey" |
| `#services` | Services: UI/UX Designer, Website Design, App Developer | Rebuilt on `/` |
| `#projects` | Projects carousel: Star's Stereo, Brewed Comfort, Hope Haven, Icebreaker | Rebuilt on `/` as a work grid |
| `#contact` | Contact details + message form | Rebuilt on `/` |
| `#` (dead links) | Placeholder links in nav / project cards | Removed, replaced by working anchors, external links, or a "not implemented" notice |
| `assets/css/styles.css`, `assets/js/main.js` | Template styles and scripts | Not carried over |

## External links (all kept and live on the new homepage)

- LinkedIn: https://www.linkedin.com/in/sai-thiruveedula/
- GitHub (project): https://github.com/GivaX/Ice-Breaker
- GitHub (project): https://github.com/ShayaanZari/hackai25
- GitHub (profile): https://github.com/Soy-Sauce-M8z
- Devpost: https://devpost.com/thirusai05
- Brewed Comfort game demo: https://soysaucem8z.itch.io/brewed-comfort
- Text me: sms:+19255578495
- Email: thirusai05@gmail.com
- Phone: +1 9255578495

## Images reused from the old site (now hosted on the app CDN)

- Profile illustration: `perfil.png`
- Project art: `starsstereo.png`, `brewedcomfort.png`, `hopehaven.png`, `icebreaker.png`
- Decorative shapes `shape-wawes.svg`, `shape-circle.svg` were template filler and were replaced with original CSS decoration.

## Content notes

- Star's Stereo has no live demo ("Currently updating..." on the old site), so it is presented as in progress.
- The old "Work" tab in the qualification section had no entries.
- The old contact form used EmailJS with a placeholder key; the new form composes a real email instead.

## To-do: pages and features still to build

- [ ] `/work/stars-stereo` case study page (currently a "coming soon" notice)
- [ ] `/work/brewed-comfort` case study page with gameplay stills and process
- [ ] `/work/hope-haven` case study page (HackAI25 write-up)
- [ ] `/work/icebreaker` case study page
- [ ] `/about` long-form bio, photo, and personal story
- [ ] `/resume` printable résumé page plus a downloadable PDF
- [ ] `/skills` deep page: tooling, coursework, and certifications detail
- [ ] `/contact` dedicated page (homepage keeps the short form)
- [ ] Real contact-form delivery (Convex storage or email) instead of a mail-app compose step
- [ ] Project filtering by type (design / development / games)
- [ ] Open Graph social image and per-page metadata for every new route
