import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { CustomCursor } from '../components/custom-cursor'
import { ArrowDoodle, FlowerDoodle, SmileyDoodle, SparkleDoodle, SquiggleDoodle } from '../components/doodles'
import { SiteFooter, SiteHeader } from '../components/site-chrome'
import { projects } from '../data/portfolio'
import { useScrollReveal } from '../hooks/use-scroll-reveal'
import { canonicalUrl } from '../lib/canonical-url'
import siteMetadata from '../metadata.json'

const pageMeta = siteMetadata['/work/stars-stereo']
const project = projects.find((item) => item.id === 'stars-stereo')

const facts = [
  { label: 'Role', value: 'Design and build' },
  { label: 'Timeline', value: 'In progress' },
  { label: 'Tools', value: 'Python · Discord API' },
  { label: 'Type', value: 'Discord bot' },
]

const approach = [
  {
    step: '01',
    title: 'Give the bot a personality',
    body: 'Before any command worked I wrote down how the bot should sound. Warm, a little shy, never corporate. Every response line in the bot comes from that voice sheet, so the music player feels like a character and not a control panel.',
  },
  {
    step: '02',
    title: 'Make the queue explain itself',
    body: 'A queue is the hardest thing to show in a chat window. I kept one message that edits itself as tracks change: what is playing, what is next, who asked for it, and two buttons for skip and stop. No new message per action, no scrolling to find the controls.',
  },
  {
    step: '03',
    title: 'Put lyrics in the room',
    body: 'Lyrics arrive with the track and follow along as it plays, the way a lyric booklet sits next to a stereo. If a song has no lyrics the panel steps aside instead of showing an empty box.',
  },
]

const decisions = [
  {
    title: 'One message, not many',
    body: 'The player message updates in place. It keeps the channel readable and makes the bot feel like an object sitting in the room rather than a stream of replies.',
  },
  {
    title: 'Sticker-book visuals',
    body: 'The bot uses the same pink pixel-art language as its title card, so the personality carries from the portfolio into the product.',
  },
  {
    title: 'Failures stay in character',
    body: 'A missing link, an empty queue, or a song that will not load all get a short line in the bot voice. Errors are written, not printed.',
  },
]

const build = [
  'Python with discord.py, organised into commands, a player service, and a small queue model so playback logic does not live inside command handlers.',
  'Voice handling through the Discord API, with the bot joining, leaving, and cleaning up its connection when a channel empties.',
  'A lyric lookup layer that stays optional, so playback never blocks on a third-party service.',
]

function CaseStudy() {
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
          <SquiggleDoodle className="hidden w-24 text-tan-deep/60 lg:block lg:absolute lg:right-24 lg:bottom-6" />
          <p className="kicker text-[0.6rem] text-tan-deep">Case study · Discord bot</p>
          <h1 className="display mt-4 text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">Star&apos;s Stereo</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            A music bot for Discord with a soft, sticker-book personality. Queue control, lyrics, and a listening
            room that feels like a bedroom stereo rather than a command line.
          </p>
        </header>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="kicker text-[0.55rem] text-ink-soft">{fact.label}</dt>
              <dd className="mt-2 text-sm text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <figure className="relative mt-12" data-reveal>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-paper-soft">
            <img
              src={project?.image}
              alt={project?.alt ?? "Pixel-art pink title card for Star's Stereo"}
              className="w-full object-cover"
              width={1200}
              height={800}
            />
          </div>
          <figcaption className="mt-4 kicker text-[0.55rem] text-ink-soft">
            Title card · pixel art and type direction
          </figcaption>
        </figure>

        <section className="relative mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]" data-reveal>
          <div className="relative">
            <SparkleDoodle className="hidden size-7 text-tan-deep lg:block lg:absolute lg:-left-8 lg:top-2" />
            <h2 className="display text-3xl leading-tight sm:text-4xl">The short version</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-ink-soft">
            <p>
              Music bots in Discord are usually utilities: type a command, get a link, lose the controls in the chat
              history. Star&apos;s Stereo started from a smaller, warmer question. What if the bot felt like a stereo in
              your room, with a face, a mood, and one place where everything about the song lives?
            </p>
            <p>
              I designed the personality, the player message, and the queue behaviour, then built the bot in Python
              against the Discord API. It is still in progress, and this page documents the decisions rather than a
              finished release.
            </p>
          </div>
        </section>

        <section className="relative mt-16" data-reveal>
          <SquiggleDoodle className="hidden w-24 text-tan-deep/70 lg:block lg:absolute lg:right-0 lg:top-2" />
          <h2 className="display text-3xl leading-tight sm:text-4xl">The problem</h2>
          <div className="mt-6 grid gap-5 text-base leading-relaxed text-ink-soft sm:grid-cols-2">
            <p>
              Chat is a bad interface for playback. Controls scroll away, the current song is buried under replies,
              and asking for a queue means reading twenty lines of text. Every action competes with conversation.
            </p>
            <p>
              The other half of the problem was tone. Most bots answer like a terminal. A music bot sits in a friend
              server for hours, so its voice matters as much as its features. I wanted a bot that sounds like a person
              who likes the songs you picked.
            </p>
          </div>
        </section>

        <section className="relative mt-16" data-reveal>
          <h2 className="display text-3xl leading-tight sm:text-4xl">Approach</h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {approach.map((item) => (
              <li key={item.step} className="rounded-3xl border border-line bg-paper-soft p-6">
                <span className="kicker text-[0.55rem] text-tan-deep">{item.step}</span>
                <h3 className="mt-3 text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="relative mt-16 overflow-hidden rounded-[2rem] border border-line bg-paper-deep/50 p-6 sm:p-10" data-reveal>
          <FlowerDoodle className="hidden size-9 text-tan-deep/70 sm:block sm:absolute sm:right-8 sm:top-8" />
          <h2 className="display text-3xl leading-tight sm:text-4xl">Design decisions</h2>
          <ul className="mt-8 space-y-6">
            {decisions.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-tan-deep" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-medium text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]" data-reveal>
          <div>
            <h2 className="display text-3xl leading-tight sm:text-4xl">The build</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Python and the Discord API do the heavy lifting. The interesting work was keeping playback state honest
              while the bot stayed easy to change.
            </p>
            <div className="relative mt-5 h-14 w-24">
              <ArrowDoodle className="inset-0 w-24 text-tan-deep [transform:scaleY(-1)]" />
            </div>
          </div>
          <ul className="space-y-4">
            {build.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-line bg-paper-soft px-5 py-4 text-sm leading-relaxed text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="relative mt-16" data-reveal>
          <SmileyDoodle className="hidden size-8 text-tan-deep lg:block lg:absolute lg:-left-16 lg:top-1" />
          <h2 className="display text-3xl leading-tight sm:text-4xl">What I learned</h2>
          <div className="mt-6 grid gap-5 text-base leading-relaxed text-ink-soft sm:grid-cols-2">
            <p>
              A chat message can be a component. Treating the player message as a small interface, with state and its
              own update cycle, changed how I think about bots in general.
            </p>
            <p>
              Voice and error copy are design work, not decoration. Writing the failure lines early made the bot feel
              finished long before the feature list was.
            </p>
          </div>
        </section>

        <div className="relative mt-16 flex flex-wrap items-center gap-3 border-t border-line pt-8" data-reveal>
          <SparkleDoodle className="hidden size-6 text-tan-deep sm:block sm:absolute sm:right-2 sm:-top-5" />
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 kicker text-[0.6rem] text-ink transition-colors hover:border-tan-deep hover:bg-tan-soft"
            data-testid="case-study-more-work"
          >
            See more work
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export const Route = createFileRoute('/work/stars-stereo')({
  head: () => {
    const canonical = canonicalUrl('/work/stars-stereo')

    return {
      meta: [
        { title: pageMeta.title },
        { name: 'description', content: pageMeta.description },
        { property: 'og:title', content: pageMeta.title },
        { property: 'og:description', content: pageMeta.description },
        { property: 'og:type', content: 'article' },
      ],
      links: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    }
  },
  component: CaseStudy,
})
