import fs from 'node:fs'
import path from 'node:path'
import {toHTML} from '@portabletext/to-html'
import {createImageUrlBuilder} from '@sanity/image-url'
import {sanityClient} from './sanity-client.js'

const projectRoot = process.cwd()
const journalDirectory = path.join(projectRoot, 'journal')
const siteUrl = 'https://webpage-alexandras.vercel.app'

const imageBuilder = createImageUrlBuilder(sanityClient)

function urlFor(source) {
  return imageBuilder.image(source)
}

function escapeHTML(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function renderTags(tags = []) {
  if (!tags.length) return ''

  return `
    <div class="article-tags">
      ${tags
        .map(
          (tag) =>
            `<span class="article-tag">${escapeHTML(tag)}</span>`,
        )
        .join('')}
    </div>
  `
}

function renderHeader() {
  return `
    <header class="site-header">
      <div class="header-inner">

        <a
          href="/"
          class="header-logo"
          aria-label="Alexandra's Floral home"
        >
          <img
            src="/assets/logo/Alexandra logos-svg (1).svg"
            alt="Alexandra's Floral logo"
          />
        </a>

        <a href="/" class="brand-name">
          Alexandra's Floral
        </a>

        <nav class="main-nav" aria-label="Main navigation">

          <a
            href="/#collections"
            class="nav-item"
            aria-label="Collections"
            title="Collections"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1"></rect>
            </svg>
            <span>Collections</span>
          </a>

          <a
            href="/#locations"
            class="nav-item"
            aria-label="Locations"
            title="Locations"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"></path>
              <circle cx="12" cy="10" r="2.5"></circle>
            </svg>
            <span>Locations</span>
          </a>

          <a
            href="/journal/"
            class="nav-item"
            aria-current="page"
            aria-label="Journal"
            title="Journal"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"
              ></path>
              <path d="M4 5.5V22"></path>
              <path d="M8 7h8"></path>
              <path d="M8 11h8"></path>
            </svg>
            <span>Journal</span>
          </a>

          <a
            href="/#contact"
            class="nav-item"
            aria-label="Contact Alexandra's Floral"
            title="Contact"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21 16.5v3a2 2 0 0 1-2.2 2
                    A18 18 0 0 1 3.5 6.7
                    A2 2 0 0 1 5.7 4.5h3
                    a2 2 0 0 1 2 1.7
                    l.5 2a2 2 0 0 1-.6 1.8
                    l-1.3 1.3
                    a16 16 0 0 0 5.9 5.9
                    l1.3-1.3
                    a2 2 0 0 1 1.8-.6
                    l2 .5a2 2 0 0 1 1.7 2z"
              ></path>
            </svg>
            <span>Contact</span>
          </a>

        </nav>
      </div>
    </header>
  `
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-container">

        <div class="footer-top">

          <div class="footer-brand">
            <a href="/" class="footer-logo">
              Alexandra's Floral
            </a>

            <p>one bouquet at a time</p>
          </div>

          <nav class="footer-nav" aria-label="Footer navigation">
            <a href="/#collections">Collections</a>
            <a href="/#locations">Locations</a>
            <a href="/journal/">Journal</a>
            <a href="/#contact">Contact</a>
          </nav>

          <div class="footer-socials">

            <a
              href="https://www.instagram.com/alexandrasfloral/"
              aria-label="Instagram"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.5" cy="6.5" r="1"></circle>
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@alexandrasfloral"
              aria-label="TikTok"
              title="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.2 4v10.2a4.2 4.2 0 1 1-3.2-4.1"></path>
                <path d="M14.2 4c.7 1.8 2 3 4 3.3"></path>
              </svg>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61583596942140"
              aria-label="Facebook"
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1z"></path>
              </svg>
            </a>

            <a
              href="https://x.com/Alexandrafloral"
              aria-label="X"
              title="X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25z"></path>
              </svg>
            </a>

          </div>

        </div>

        <div class="footer-bottom">
          <p>© 2026 Alexandra's Floral. All rights reserved.</p>
        </div>

      </div>
    </footer>
  `
}

function renderHead({
  title,
  description,
  canonical,
  image,
  type = 'website',
}) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>${escapeHTML(title)}</title>

        <meta
          name="description"
          content="${escapeHTML(description)}"
        />

        <link rel="canonical" href="${escapeHTML(canonical)}" />

        <meta property="og:type" content="${type}" />
        <meta property="og:title" content="${escapeHTML(title)}" />
        <meta property="og:description" content="${escapeHTML(description)}" />
        <meta property="og:url" content="${escapeHTML(canonical)}" />
        ${
          image
            ? `<meta property="og:image" content="${escapeHTML(image)}" />`
            : ''
        }

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${escapeHTML(title)}" />
        <meta
          name="twitter:description"
          content="${escapeHTML(description)}"
        />
        ${
          image
            ? `<meta name="twitter:image" content="${escapeHTML(image)}" />`
            : ''
        }

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="/style.css" />
        <link rel="stylesheet" href="/journal.css" />
      </head>
  `
}

function renderPortableText(body = []) {
  return toHTML(body, {
    components: {
      types: {
        image: ({value}) => {
          if (!value?.asset?._ref) return ''

          const imageUrl = urlFor(value)
            .width(1400)
            .auto('format')
            .url()

          const alt = escapeHTML(
            value.alt || 'Alexandra’s Floral Journal image',
          )

          const caption = value.caption
            ? `<figcaption>${escapeHTML(value.caption)}</figcaption>`
            : ''

          return `
            <figure class="article-body-image">
              <img
                src="${escapeHTML(imageUrl)}"
                alt="${alt}"
                loading="lazy"
              />
              ${caption}
            </figure>
          `
        },
      },
    },
  })
}

function renderArticleCard(article) {
  const imageUrl = article.coverImage
    ? urlFor(article.coverImage)
        .width(900)
        .height(675)
        .fit('crop')
        .auto('format')
        .url()
    : ''

  return `
    <article class="journal-card">
      <a href="/journal/${escapeHTML(article.slug)}/">

        ${
          imageUrl
            ? `
              <div class="journal-card-image">
                <img
                  src="${escapeHTML(imageUrl)}"
                  alt="${escapeHTML(article.coverImageAlt || article.title)}"
                  loading="lazy"
                />
              </div>
            `
            : ''
        }

        <div class="journal-card-content">
          ${renderTags(article.tags)}

          <h2 class="journal-card-title">
            ${escapeHTML(article.title)}
          </h2>

          <p class="journal-card-excerpt">
            ${escapeHTML(article.excerpt)}
          </p>

          <p class="journal-card-meta">
            ${escapeHTML(article.authorName || 'Alexandra’s Floral')}
            ·
            ${escapeHTML(formatDate(article.publishedAt))}
          </p>
        </div>

      </a>
    </article>
  `
}

function renderFeaturedArticle(article) {
  const imageUrl = article.coverImage
    ? urlFor(article.coverImage)
        .width(1400)
        .height(900)
        .fit('crop')
        .auto('format')
        .url()
    : ''

  return `
    <section class="journal-featured">
      <div class="journal-container">

        <p class="journal-section-label">Featured Story</p>

        <article class="featured-card">

          ${
            imageUrl
              ? `
                <a
                  href="/journal/${escapeHTML(article.slug)}/"
                  class="featured-image"
                >
                  <img
                    src="${escapeHTML(imageUrl)}"
                    alt="${escapeHTML(article.coverImageAlt || article.title)}"
                  />
                </a>
              `
              : ''
          }

          <div class="featured-content">

            ${renderTags(article.tags)}

            <h2>
              ${escapeHTML(article.title)}
            </h2>

            <p class="featured-excerpt">
              ${escapeHTML(article.excerpt)}
            </p>

            <div class="article-meta">
              <span>
                ${escapeHTML(article.authorName || 'Alexandra’s Floral')}
              </span>
              <span>·</span>
              <span>
                ${escapeHTML(formatDate(article.publishedAt))}
              </span>
            </div>

            <a
              href="/journal/${escapeHTML(article.slug)}/"
              class="article-link"
            >
              Read Article →
            </a>

          </div>

        </article>

      </div>
    </section>
  `
}

function renderJournalPage(articles) {
  const featured =
    articles.find((article) => article.featured) || articles[0]

  const remaining = featured
    ? articles.filter((article) => article._id !== featured._id)
    : []

  return `
    ${renderHead({
      title: "The Alexandra's Floral Journal",
      description:
        "Flower care advice, gifting ideas, floral inspiration, bridal insights and stories from Alexandra's Floral.",
      canonical: `${siteUrl}/journal/`,
    })}

    <body>

      ${renderHeader()}

      <main class="journal-page">

        <section class="journal-hero">
          <div class="journal-hero-inner">
            <p class="journal-eyebrow">Alexandra's Floral</p>

            <h1>The Journal</h1>

            <p>
              Ideas, inspiration and practical advice for flowers,
              gifting, celebrations and everyday moments.
            </p>
          </div>
        </section>

        ${
          featured
            ? renderFeaturedArticle(featured)
            : `
              <section class="journal-empty">
                <h2>Our Journal is coming soon.</h2>
                <p>Beautiful stories and floral inspiration are on the way.</p>
              </section>
            `
        }

        ${
          remaining.length
            ? `
              <section class="journal-grid-section">
                <div class="journal-container">

                  <p class="journal-section-label">Latest Stories</p>

                  <div class="journal-grid">
                    ${remaining.map(renderArticleCard).join('')}
                  </div>

                </div>
              </section>
            `
            : ''
        }

      </main>

      ${renderFooter()}

    </body>
    </html>
  `
}

function renderArticlePage(article) {
  const canonical = `${siteUrl}/journal/${article.slug}/`

  const coverUrl = article.coverImage
    ? urlFor(article.coverImage)
        .width(1600)
        .auto('format')
        .url()
    : ''

  const title = article.seoTitle || article.title
  const description = article.seoDescription || article.excerpt

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.authorName || "Alexandra's Floral",
    },
    image: coverUrl ? [coverUrl] : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    publisher: {
      '@type': 'Organization',
      name: "Alexandra's Floral",
      url: siteUrl,
    },
  }

  return `
    ${renderHead({
      title,
      description,
      canonical,
      image: coverUrl,
      type: 'article',
    })}

    <body>

      ${renderHeader()}

      <main class="article-page">

        <header class="article-header">

          ${renderTags(article.tags)}

          <h1>${escapeHTML(article.title)}</h1>

          <p class="article-excerpt">
            ${escapeHTML(article.excerpt)}
          </p>

          <p class="article-byline">
            ${escapeHTML(article.authorName || "Alexandra's Floral")}
            ·
            ${escapeHTML(formatDate(article.publishedAt))}
          </p>

        </header>

        ${
          coverUrl
            ? `
              <figure class="article-cover">
                <img
                  src="${escapeHTML(coverUrl)}"
                  alt="${escapeHTML(article.coverImageAlt || article.title)}"
                />
              </figure>
            `
            : ''
        }

        <article class="article-content">
          ${renderPortableText(article.body)}
        </article>

        <div class="article-end">
          <a href="/journal/" class="article-back">
            ← Back to Journal
          </a>
        </div>

      </main>

      <script type="application/ld+json">
        ${JSON.stringify(jsonLd)}
      </script>

      ${renderFooter()}

    </body>
    </html>
  `
}

const articles = await sanityClient.fetch(`
  *[
    _type == "journalArticle" &&
    defined(slug.current) &&
    defined(publishedAt)
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    coverImageAlt,
    excerpt,
    "authorName": author->name,
    publishedAt,
    featured,
    tags,
    body,
    seoTitle,
    seoDescription
  }
`)

console.log(`Found ${articles.length} published Journal article(s).`)

/*
 * Remove previously generated Journal pages.
 * This prevents deleted/unpublished articles from remaining
 * on the website during future builds.
 */
if (fs.existsSync(journalDirectory)) {
  fs.rmSync(journalDirectory, {
    recursive: true,
    force: true,
  })
}

fs.mkdirSync(journalDirectory, {recursive: true})

/*
 * Generate Journal landing page.
 */
fs.writeFileSync(
  path.join(journalDirectory, 'index.html'),
  renderJournalPage(articles),
)

console.log('Generated: journal/index.html')

/*
 * Generate individual article pages.
 */
for (const article of articles) {
  const articleDirectory = path.join(
    journalDirectory,
    article.slug,
  )

  fs.mkdirSync(articleDirectory, {recursive: true})

  fs.writeFileSync(
    path.join(articleDirectory, 'index.html'),
    renderArticlePage(article),
  )

  console.log(
    `Generated: journal/${article.slug}/index.html`,
  )
}