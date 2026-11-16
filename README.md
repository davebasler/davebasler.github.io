# davebasler.github.io

Personal portfolio of Dave Brian Basler: a single static page, with no framework and no build step.
GitHub Pages serves it from the default branch.

## Structure

```
index.html        English page: all content and SEO metadata (title, description, Open Graph, JSON-LD)
de/index.html     German page (Swiss Standard German: "ss" instead of "ß"). Same structure as index.html
style.css         Design system (tokens at the top: colours, fonts, spacing), light/dark, print
script.js         Progressive enhancement only: scroll reveal, active nav, language switch, live counters
404.html          Custom "not found" page (bilingual)
robots.txt        Allows indexing and points crawlers to the sitemap
sitemap.xml       Lists both languages; update <lastmod> when content changes
assets/img/       Portrait in web sizes (WebP + JPEG fallback, metadata stripped)
assets/           Self-hosted fonts (OFL licensed), favicon, social preview images (EN + DE)
```

## Two languages

The English page lives at `/` and the German page at `/de/`. They are separate pages so Google can index
each language on its own. The `hreflang` tags in both `<head>`s and in `sitemap.xml` link the two versions.
**When you change content, change it in both files.** Section IDs (`#about`, `#experience` …) are identical
in both, so the EN/DE switch keeps the visitor in the same section.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing content

Everything lives in `index.html`. Each section is marked by a comment such as `<!-- ===== 03 EXPERIENCE ===== -->`.
To add a role, copy an existing `<li class="entry">` block.
When the job title or summary changes, also update `<title>`, `meta description`, `og:*` and the JSON-LD block in `<head>`.
`assets/og-image.png` and `assets/og-image-de.png` are the preview images shown when the link is shared on
LinkedIn, Slack and similar apps.

## SEO checklist

1. **Google Search Console** (free, no tracking code needed): add a *URL-prefix* property for
   `https://davebasler.github.io/` and verify it with the HTML-tag method. Paste the tag where
   `index.html` has the placeholder comment, then submit `sitemap.xml`.
2. **Backlinks matter most for ranking on your own name.** Link this site from LinkedIn (Contact info → Website),
   from your GitHub profile, ResearchGate and ORCID, and from your email signature.
3. **Custom domain (optional, recommended):** for example `davebasler.ch`. Add a `CNAME` file and configure DNS
   as described in GitHub's docs. Afterwards, replace `https://davebasler.github.io/` everywhere in
   `index.html`, `de/index.html`, `robots.txt` and `sitemap.xml`.

## Analytics

None is enabled. If you want visitor numbers, prefer a cookieless tool that doesn't need a consent banner:

- **GoatCounter**: free for personal sites, open source, no cookies. Add before `</body>`:
  `<script data-goatcounter="https://YOURCODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`
- **Cloudflare Web Analytics**: free and cookieless.
- **Google Analytics 4**: works, but it sets cookies. EU visitors (GDPR) require a consent banner, and the Swiss
  revFADP requires a privacy notice. That is a lot of overhead for a portfolio.
