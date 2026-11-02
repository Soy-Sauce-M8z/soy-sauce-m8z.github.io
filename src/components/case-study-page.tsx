import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { CustomCursor } from './custom-cursor'
import { SquiggleDoodle, SparkleDoodle } from './doodles'
import { SiteFooter, SiteHeader } from './site-chrome'
import type { CaseStudy } from '../data/case-studies'
import { useScrollReveal } from '../hooks/use-scroll-reveal'
import { canonicalUrl } from '../lib/canonical-url'
import siteMetadata from '../metadata.json'

type Meta = { title: string; description: string }

/** Shared head() payload for case study routes. */
export function caseStudyHead(path: string) {
  const meta = (siteMetadata as Record<string, Meta | undefined>)[path]

  return {
    meta: [
      { title: meta?.title ?? 'Case study · Sai Thiruveedula' },
      { name: 'description', content: meta?.description ?? '' },
      { property: 'og:title', content: meta?.title ?? 'Case study' },
      { property: 'og:description', content: meta?.description ?? '' },
      { property: 'og:type', content: 'article' },
    ],
    links: (() => {
      const canonical = canonicalUrl(path)
      return canonical ? [{ rel: 'canonical', href: canonical }] : []
    })(),
  }
}

function Placeholder() {
  return (
    <p className="rounded-2xl border border-dashed border-line-strong px-5 py-4 text-sm text-ink-soft">
      Details to be added.
    </p>
  )
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  useScrollReveal()

  return (
    <div className="min-h-screen bg-paper text-ink">
      <CustomCursor />
      <SiteHeader />

      <main id="top" className="mx-auto w-full max-w-5xl px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
        <Link
          to="/"
          hash="work"
          className="group inline-flex items-center gap-2 kicker text-[0.6rem] text-ink-soft transition-colors hover:text-tan-deep"
          data-testid="case-study-back"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to work
        </Link>

        <header className="relative mt-8">
          <SquiggleDoodle className="hidden w-24 text-tan-deep/60 lg:block lg:absolute lg:right-6 lg:bottom-6" />
          <p className="kicker text-[0.6rem] text-tan-deep">{study.kicker}</p>
          <h1 className="display mt-4 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">{study.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{study.lede}</p>
        </header>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
          {study.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="kicker text-[0.55rem] text-ink-soft">{fact.label}</dt>
              <dd className="mt-2 text-sm text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <figure className="relative mt-12" data-reveal>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-paper-soft">
            {study.image ? (
              <img src={study.image} alt={study.imageAlt ?? study.title} className="w-full object-cover" />
            ) : (
              <div className="flex aspect-[16/9] items-center justify-center bg-paper-deep/40">
                <span className="kicker text-[0.55rem] text-ink-soft">Image to be added</span>
              </div>
            )}
          </div>
          {study.imageCaption ? (
            <figcaption className="mt-4 kicker text-[0.55rem] text-ink-soft">{study.imageCaption}</figcaption>
          ) : null}
        </figure>

        {study.blocks.length === 0 ? (
          <div className="mt-16 space-y-4" data-reveal>
            <h2 className="display text-3xl leading-tight sm:text-4xl">Story to come</h2>
            <Placeholder />
          </div>
        ) : null}

        {study.blocks.map((block, index) => (
          <section key={block.title} className="relative mt-16" data-reveal>
            {index === 1 ? (
              <SparkleDoodle className="hidden size-7 text-tan-deep lg:block lg:absolute lg:right-0 lg:top-1" />
            ) : null}
            <h2 className="display text-3xl leading-tight sm:text-4xl">{block.title}</h2>

            {block.body?.length ? (
              <div className="mt-5 grid gap-5 text-base leading-relaxed text-ink-soft sm:grid-cols-2">
                {block.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {block.cards?.length ? (
              <ol className="mt-8 grid gap-5 sm:grid-cols-3">
                {block.cards.map((card) => (
                  <li key={card.title} className="rounded-3xl border border-line bg-paper-soft p-6">
                    <span className="kicker text-[0.55rem] text-tan-deep">{card.title.split(' · ')[0]}</span>
                    <h3 className="mt-3 text-lg font-medium text-ink">{card.title.split(' · ').slice(1).join(' · ')}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{card.body}</p>
                  </li>
                ))}
              </ol>
            ) : null}

            {block.list?.length ? (
              <ul className="mt-6 space-y-5">
                {block.list.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-tan-deep" aria-hidden="true" />
                    <div>
                      <h3 className="text-base font-medium text-ink">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            {!block.body?.length && !block.cards?.length && !block.list?.length ? <div className="mt-5"><Placeholder /></div> : null}
          </section>
        ))}

        <div className="relative mt-16 flex flex-wrap items-center gap-3 border-t border-line pt-8" data-reveal>
          <SparkleDoodle className="hidden size-6 text-tan-deep sm:block sm:absolute sm:right-2 sm:-top-5" />
          {(study.links ?? []).map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className={
                index === 0
                  ? 'inline-flex items-center gap-2 rounded-full bg-tan-deep px-5 py-3 kicker text-[0.6rem] text-paper transition-opacity hover:opacity-90'
                  : 'inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 kicker text-[0.6rem] text-ink transition-colors hover:border-tan-deep hover:bg-tan-soft'
              }
              data-testid={`case-study-link-${index}`}
            >
              {link.label}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ))}
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 kicker text-[0.6rem] text-ink transition-colors hover:border-tan-deep hover:bg-tan-soft"
          >
            More work
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
