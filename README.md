# Matheus Pereira — Personal Portfolio

**Live:** [dzevpnmz8iacy.cloudfront.net](https://dzevpnmz8iacy.cloudfront.net)

A personal portfolio built from scratch — not just as a showcase, but as a real engineering and design project. Every visual decision, interaction, and infrastructure choice was intentional and researched.

---

## Infrastructure & Cloud Architecture

The portfolio is hosted entirely on AWS, designed to be fast, reliable, and automatically updated.

- **AWS S3** stores the static files (HTML, CSS, JS, images, videos) in a private bucket with no direct public access.
- **AWS CloudFront** sits in front of S3 as a global CDN, handling all public traffic. This ensures low latency worldwide, HTTPS by default, and cache control at the edge.
- **CI/CD Pipeline** automates every deployment. A push to the main branch triggers the pipeline, which syncs the new files to S3 and invalidates the CloudFront cache automatically. No manual steps, no FTP, no drag-and-drop. Code goes in, the live site updates.

This setup was built as a hands-on lab alongside studying for the **AWS Cloud Practitioner** certification, turning theory into a real production environment.

---

## Design Process

Nothing in this project was copied and pasted as-is. The visual identity came from an extensive research process that combined references from multiple sources into something cohesive.

### Color & Visual Identity

The color palette went through several research cycles. The goal was to find a combination that felt technical but not cold, modern but not generic. References were pulled from design showcases, developer portfolios, and motion design reels. The final palette — deep blacks, muted blues, and electric cyan accents — was chosen because it created contrast without aggression and felt consistent across both the dark background sections and the lighter card surfaces.

### Components & Interactions

Almost every component is a hybrid. A piece of one carousel style was combined with structural ideas from another. Card layouts were mixed and matched — the expand-on-hover behavior of the project cards, for example, came from combining a transition technique seen in a UI showcase with a content reveal pattern from a completely different context. The goal was always: what feels natural here, not what looks impressive in isolation.

The project card animation — where content appears to emerge from nothing as the card expands — uses a combination of `max-height` transitions and carefully tuned `overflow: hidden` behavior. The effect was designed so that the items inside feel like they are being born from the card rather than sliding in from outside it.

### The LinkedIn Carousel Scroll Interaction

This interaction has a specific origin story.

While browsing Amazon Prime Video one evening, the horizontal scroll on the genre rows caught my attention — not because of the scroll direction itself, but because of how effortlessly discoverable it was. You did not need instructions. You just tried it and it worked.

The challenge for the portfolio carousel was different: the layout is vertical, so a horizontal scroll trigger would feel disconnected. The insight was to invert the axis — use vertical scroll to drive the carousel, because vertical scrolling is the most natural gesture on any device. A user scrolling down the page would inevitably trigger the carousel without even meaning to, which means they discover the interaction by accident. That accidental discovery is more powerful than any tooltip or instruction.

As a secondary benefit, vertical-scroll carousels also work naturally with trackpads, where two-finger swipes in any direction feel native. So the interaction works intuitively for mouse users, trackpad users, and touch users without any extra code paths.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Hosting | AWS S3 |
| CDN | AWS CloudFront |
| Deployment | CI/CD Pipeline, Git |
| Frontend | HTML5, CSS3, JavaScript |
| Animations | CSS Keyframes, Intersection Observer API, ScrollTimeline |
| Fonts | Google Fonts (Josefin Sans, Libre Baskerville, Odibee Sans) |
| Icons | Font Awesome 6 |

---

## About Me

Software Engineer based in Belem, Brazil. Focused on backend systems and full-stack development, with a habit of thinking carefully about the user experience of everything I build — including the tools and interfaces I create for myself.

[linkedin.com/in/mcthias](https://linkedin.com/in/mcthias) — [github.com/MCTHIAS](https://github.com/MCTHIAS) — thiasmcp@gmail.com
