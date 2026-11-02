import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { ArrowDown, Github, Linkedin } from 'lucide-react'
import { CustomCursor } from '../components/custom-cursor'
import { ArrowDoodle, FlowerDoodle, SmileyDoodle, SparkleDoodle, SquiggleDoodle } from '../components/doodles'
import { SiteFooter, SiteHeader } from '../components/site-chrome'
import { ToastHost } from '../components/toast-host'
import { education, profile, projectFilters, projects, skillGroups, stats } from '../data/portfolio'
import { useScrollReveal } from '../hooks/use-scroll-reveal'
import { notify } from '../lib/toast'
import { canonicalUrl } from '../lib/canonical-url'
import siteMetadata from '../metadata.json'

const MESSAGE_LIMIT = 1000

const homepageMeta = siteMetadata['/']

export const Route = createFileRoute('/')({
  head: () => {
    const canonical = canonicalUrl('/')

    return {
      meta: [
        { title: homepageMeta.title },
        { name: 'description', content: homepageMeta.description },
        { property: 'og:title', content: homepageMeta.title },
        { property: 'og:description', content: homepageMeta.description },
        { property: 'og:type', content: 'website' },
      ],
      links: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    }
  },
  component: App,
})

const tickerWords = ['Design', 'Code', 'Create', 'Repeat']
const tickerSequence = Array.from({ length: 6 }, () => tickerWords).flat()


function ArrowUpRight({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4.5 11.5L11.5 4.5M5.5 4.5h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DevpostIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5l8.2 4.75v9.5L12 21.5 3.8 16.75v-9.5L12 2.5z" strokeLinejoin="round" />
    </svg>
  )
}

function SectionHead({ title }: { title: React.ReactNode }) {
  return (
    <div data-reveal>
      <h2 className="display text-[clamp(2.6rem,7vw,4.6rem)] text-ink">{title}</h2>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <SquiggleDoodle className="doodle top-[48%] left-[-2%] hidden w-28 lg:block" />
        <SmileyDoodle className="doodle doodle-drift bottom-[20%] left-[36%] hidden size-9 lg:block" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-between px-4 pt-0 pb-6 sm:px-7 sm:pt-8 lg:max-w-none lg:min-h-[calc(100svh-4.6rem)] lg:pr-0 lg:pl-[max(1.75rem,calc((100vw-1320px)/2))] lg:pt-0">
        <div className="flex flex-1 items-center py-8 lg:py-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch lg:gap-10">
          <div className="relative order-2 pl-5 sm:pl-7 lg:order-1">
            <SparkleDoodle className="doodle doodle-drift hidden lg:block lg:absolute lg:-right-4 lg:top-0 lg:size-14" />
            <span className="absolute top-1 left-0 h-[calc(100%-1.5rem)] w-px bg-tan" aria-hidden="true" />

            <p className="kicker text-tan-deep">Computer science student + UX designer</p>

            <h1 className="display mt-4 text-[clamp(3.1rem,8.6vw,7rem)] text-ink">
              Building
              <br />
              things that
              <br />
              <span className="text-tan-deep">
                feel human.
                <br />
                <br />
              </span>
            </h1>

            <div className="relative mt-4 w-fit">
              <p className="hand -rotate-1 text-[clamp(1.4rem,2.6vw,1.9rem)] text-ink-soft">
                built to connect
              </p>
              <svg
                viewBox="0 0 90 40"
                className="absolute -right-14 -bottom-3 hidden size-12 text-tan sm:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 6c14 24 38 30 62 22" strokeLinecap="round" />
                <path d="M56 22l12 6-9 9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 kicker text-[0.62rem] text-paper transition-colors hover:bg-tan hover:text-ink"
                data-testid="hero-work-cta"
              >
                See the work
                <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <div className="flex items-center gap-2">
                {[
                  { label: 'GitHub', href: profile.github, Icon: Github },
                  { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
                  { label: 'Devpost', href: profile.devpost, Icon: DevpostIcon },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-tan-deep hover:bg-tan-soft"
                    data-testid={`hero-social-${label.toLowerCase()}`}
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative order-1 -mx-4 sm:-mx-7 lg:order-2 lg:mx-0">
            <div className="hero-shape relative aspect-[4/5] w-full overflow-hidden bg-tan-soft sm:aspect-[5/4] lg:aspect-auto lg:h-full">
              <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_10%,hsl(var(--tan-wash))_0%,hsl(var(--tan-soft))_65%)]" />
              <img
                src={profile.portrait}
                alt="Line-art portrait illustration of Sai Thiruveedula waving hello"
                width={791}
                height={1280}
                className="absolute inset-x-0 bottom-0 mx-auto h-[86%] w-auto object-contain object-bottom"
              />
            </div>

          </div>
        </div>
        </div>

        <div className="grid grid-cols-2 gap-y-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-4 lg:pr-[max(1.75rem,calc((100vw-1320px)/2))]">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2.5 sm:block">
              <p className="display text-[clamp(1.9rem,4vw,2.6rem)] text-ink">{stat.value}</p>
              <p className="max-w-[9rem] font-sans text-[0.62rem] leading-tight font-semibold tracking-[0.14em] uppercase text-ink-soft sm:mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="ticker border-y border-ink bg-ink py-3">
        <div className="ticker-track items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {tickerSequence.map((word, i) => (
                <span key={`${copy}-${i}`} className="flex items-center gap-10 pr-10">
                  <span className="display text-lg text-paper">{word}</span>
                  <span className="size-2 shrink-0 rounded-full bg-tan-deep" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Work() {
  const [active, setActive] = useState<string[]>([])

  const toggleFilter = (id: string) => {
    if (id === 'all') {
      setActive([])
      return
    }

    setActive((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  const visible = active.length === 0 ? projects : projects.filter((project) => active.includes(project.filter))

  return (
    <section id="work" className="relative mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-7 sm:py-24">
      <FlowerDoodle className="doodle doodle-drift top-24 right-[5%] size-8 sm:size-10 lg:size-12" />
      <SectionHead
        title={
          <>
            The work<span className="text-tan-deep">.</span>
          </>
        }
      />

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects" data-testid="project-filters">
        {projectFilters.map((filter) => {
          const isActive = filter.id === 'all' ? active.length === 0 : active.includes(filter.id)
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => toggleFilter(filter.id)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 kicker text-[0.6rem] transition-colors ${
                isActive
                  ? 'border-tan-deep bg-tan-deep text-paper'
                  : 'border-line-strong text-ink-soft hover:border-tan-deep hover:text-ink'
              }`}
              data-testid={`project-filter-${filter.id}`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-testid="project-grid" data-state="ready">
        {visible.map((project) => (
          <article key={project.id} className="group" data-reveal>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-deep">
              <img
                src={project.image}
                alt={project.alt}
                loading="eager"
                width={1150}
                height={768}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="kicker absolute top-3 left-3 rounded-full bg-paper/95 px-3 py-1.5 text-[0.6rem] text-ink">
                {project.index}
              </span>
            </div>

            <div className="mt-4">
              <p className="kicker text-[0.6rem] text-tan-deep">{project.category}</p>
            </div>

            <h3 className="display mt-2 text-[clamp(1.7rem,3.4vw,2.4rem)] text-ink">{project.title}</h3>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-paper-soft px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-ink-soft uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {project.caseStudy ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  to={project.caseStudy as '/work/stars-stereo'}
                  className="group/link inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 kicker text-[0.6rem] text-ink transition-colors hover:border-tan-deep hover:bg-tan-soft"
                  data-testid={`project-link-${project.id}`}
                >
                  Read the case study
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
                {project.action.kind === 'external' && !project.hideSecondaryAction ? (
                  <a
                    href={project.action.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 kicker text-[0.6rem] text-ink-soft transition-colors hover:border-tan-deep hover:text-ink"
                    data-testid={`project-view-${project.id}`}
                  >
                    {project.action.label}
                  </a>
                ) : null}
              </div>
            ) : project.action.kind === 'external' ? (
              <a
                href={project.action.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link mt-4 inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 kicker text-[0.6rem] text-ink transition-colors hover:border-tan-deep hover:bg-tan-soft"
                data-testid={`project-link-${project.id}`}
              >
                {project.action.label}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => notify(project.action.notice ?? 'This project is not published yet.')}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 kicker text-[0.6rem] text-ink-soft transition-colors hover:border-tan-deep hover:text-ink"
                data-testid={`project-link-${project.id}`}
              >
                {project.action.label}
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.25" />
                  <path d="M8 7.25v4M8 5h.01" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-y border-line bg-paper-deep/50">
      <SparkleDoodle className="doodle doodle-drift top-16 right-[5%] size-8 sm:size-9 lg:size-10" />
      <div className="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-7 sm:py-24">
        <SectionHead
          title={
            <>
              What I use<span className="text-tan-deep">.</span>
            </>
          }
        />

        <div className="mt-10 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} data-reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3">
                <h3 className="display text-2xl text-ink">{group.title}</h3>
              </div>
              <ul className="mt-1">
                {group.items.map((item) => (
                  <li key={item.name} className="border-b border-line py-3.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-sans text-sm font-semibold tracking-[0.04em] uppercase text-ink">
                        {item.name}
                      </span>
                      <span className="font-sans text-xs tabular-nums text-ink-soft">
                        {item.years} {item.years === 1 ? 'yr' : 'yrs'}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
                      <div
                        className="h-full rounded-full bg-tan"
                        style={{ width: `${Math.round((item.years / item.max) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section id="journey" className="relative mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-7 sm:py-24">
      <SquiggleDoodle className="doodle bottom-16 left-[3%] w-14 sm:w-20 lg:left-[4%] lg:w-24" />
      <SectionHead
        title={
          <>
            The road here<span className="text-tan-deep">.</span>
          </>
        }
      />

      <div className="mt-10">
        <ol className="divide-y divide-line border-y border-line">
          {education.map((item, i) => (
            <li key={item.title} className="flex flex-col gap-2 py-6 sm:flex-row sm:gap-6" data-reveal>
              <div className="flex items-center gap-3 sm:w-24 sm:shrink-0 sm:items-start">
                <span className="display text-3xl text-tan-deep">0{i + 1}</span>
              </div>
              <div>
                <p className="kicker text-[0.58rem] text-ink-soft">{item.date}</p>
                <h3 className="display mt-1.5 text-[clamp(1.5rem,3vw,2.1rem)] text-ink">{item.title}</h3>
                <p className="mt-1 font-sans text-sm font-semibold text-ink">{item.place}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [company, setCompany] = useState('')
  const [mounted, setMounted] = useState(false)
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [cooldownEndsAt, setCooldownEndsAt] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const sendContactMessage = useAction(api.messages.sendContactMessage)

  // Keep the button inert until React is running so an early click cannot
  // trigger a plain browser form submission that leaks the text into the URL.
  useEffect(() => {
    setMounted(true)
  }, [])

  // One message per minute: keep the button locked while the cooldown runs.
  useEffect(() => {
    if (!cooldownEndsAt) return

    const tick = () => {
      const remaining = Math.ceil((cooldownEndsAt - Date.now()) / 1000)
      setSecondsLeft(remaining > 0 ? remaining : 0)
      if (remaining <= 0) setCooldownEndsAt(0)
    }

    tick()
    const timer = window.setInterval(tick, 500)
    return () => window.clearInterval(timer)
  }, [cooldownEndsAt])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending' || secondsLeft > 0) return

    setTouched({ name: true, email: true, message: true })

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('idle')
      setError('Please fill in your name, email, and message.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus('idle')
      setError('That email address looks incomplete. Double-check it and try again.')
      return
    }

    // Honeypot: real visitors never fill this hidden field, bots usually do.
    if (company.trim()) {
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
      setCompany('')
      setError(null)
      setTouched({ name: false, email: false, message: false })
      return
    }

    setError(null)
    setStatus('sending')

    try {
      const result = await sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        company: company.trim(),
      })

      if (result?.success) {
        setStatus('sent')
        setName('')
        setEmail('')
        setMessage('')
        setError(null)
        setTouched({ name: false, email: false, message: false })
        setCooldownEndsAt(Date.now() + 60_000)
        return
      }

      if (result?.retryAfterMs) {
        setCooldownEndsAt(Date.now() + result.retryAfterMs)
      }

      setStatus('idle')
      setError(result?.error ?? 'Your message could not be sent. Please try again.')
    } catch (submitError) {
      console.error('Contact form: submit failed.', submitError)
      setStatus('idle')
      setError('Your message could not be sent. Please try again.')
    }
  }

  const nameError = !name.trim()
    ? 'Please add your name.'
    : name.trim().length > 120
      ? 'That name is a little too long.'
      : null
  const emailError = !email.trim()
    ? 'Please add your email so I can reply.'
    : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
      ? null
      : 'That email address looks incomplete. Double-check it.'
  const messageError = !message.trim()
    ? 'Please write a short message.'
    : message.trim().length < 10
      ? 'A little more detail helps, at least 10 characters.'
      : message.length > MESSAGE_LIMIT
        ? `Please keep it under ${MESSAGE_LIMIT} characters.`
        : null

  const fieldsValid = !nameError && !emailError && !messageError

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-lg border bg-paper px-3.5 py-3 font-sans text-[0.95rem] text-ink placeholder:text-ink-soft/60 focus:outline-none ${
      invalid ? 'border-destructive focus:border-destructive' : 'border-line-strong/60 focus:border-tan-deep'
    }`

  return (
    <section id="contact" className="relative overflow-hidden border-y border-line bg-paper-deep/50">
      <SmileyDoodle className="doodle doodle-drift right-[4%] bottom-24 size-8 sm:size-10 lg:size-11" />
      <div className="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-7 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
        <div data-reveal>
          <h2 className="display text-[clamp(2.6rem,7vw,4.6rem)] text-ink">
            Let&rsquo;s talk<span className="text-tan-deep">.</span>
          </h2>
          <p className="mt-6 max-w-sm font-sans text-[0.95rem] leading-relaxed text-ink-soft">
            Tell me what you&rsquo;re making, or just say hi!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative rounded-2xl border border-line bg-paper-soft p-5 sm:p-8"
          data-testid="contact-form"
          data-state={error ? 'error' : status === 'sending' ? 'loading' : status === 'sent' ? 'sent' : 'ready'}
        >
          <p className="kicker text-[0.58rem] text-tan-deep">Send a message</p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="kicker text-[0.58rem] text-ink-soft">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setTouched((current) => ({ ...current, name: true }))
                }}
                onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                placeholder="Your name"
                aria-invalid={touched.name && nameError ? 'true' : undefined}
                aria-describedby={touched.name && nameError ? 'contact-name-error' : undefined}
                className={`mt-2 ${fieldClass(Boolean(touched.name && nameError))}`}
                data-testid="contact-name"
              />
              {touched.name && nameError ? (
                <p
                  id="contact-name-error"
                  className="mt-2 font-sans text-xs text-destructive"
                  aria-live="polite"
                  data-testid="contact-name-error"
                >
                  {nameError}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="contact-email" className="kicker text-[0.58rem] text-ink-soft">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setTouched((current) => ({ ...current, email: true }))
                }}
                onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                placeholder="you@example.com"
                aria-invalid={touched.email && emailError ? 'true' : undefined}
                aria-describedby={touched.email && emailError ? 'contact-email-error' : undefined}
                className={`mt-2 ${fieldClass(Boolean(touched.email && emailError))}`}
                data-testid="contact-email"
              />
              {touched.email && emailError ? (
                <p
                  id="contact-email-error"
                  className="mt-2 font-sans text-xs text-destructive"
                  aria-live="polite"
                  data-testid="contact-email-error"
                >
                  {emailError}
                </p>
              ) : null}
            </div>
          </div>

          <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              data-testid="contact-company"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="contact-message" className="kicker text-[0.58rem] text-ink-soft">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={message}
              maxLength={MESSAGE_LIMIT}
              onChange={(event) => {
                setMessage(event.target.value.slice(0, MESSAGE_LIMIT))
                setTouched((current) => ({ ...current, message: true }))
              }}
              onBlur={() => setTouched((current) => ({ ...current, message: true }))}
              placeholder="What are you working on?"
              aria-invalid={touched.message && messageError ? 'true' : undefined}
              aria-describedby={touched.message && messageError ? 'contact-message-error' : undefined}
              className={`mt-2 resize-y ${fieldClass(Boolean(touched.message && messageError))}`}
              data-testid="contact-message"
            />
            <div className="mt-2 flex items-start justify-between gap-3">
              {touched.message && messageError ? (
                <p
                  id="contact-message-error"
                  className="font-sans text-xs text-destructive"
                  aria-live="polite"
                  data-testid="contact-message-error"
                >
                  {messageError}
                </p>
              ) : (
                <span />
              )}
              <p
                className={`shrink-0 font-sans text-xs tabular-nums ${
                  message.length >= MESSAGE_LIMIT ? 'text-destructive' : 'text-ink-soft'
                }`}
                aria-live="polite"
                data-testid="contact-message-count"
              >
                {message.length}/{MESSAGE_LIMIT}
              </p>
            </div>
          </div>

          {status === 'sent' ? (
            <div
              className="mt-4 rounded-xl border border-tan-deep/40 bg-paper px-4 py-3"
              role="status"
              data-testid="contact-success"
            >
              <p className="kicker text-[0.58rem] text-tan-deep">Message sent</p>
            </div>
          ) : null}

          {error ? (
            <p className="mt-4 border-l-2 border-destructive pl-3 font-sans text-sm text-destructive" role="alert" data-testid="contact-error">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={!mounted || !fieldsValid || status === 'sending' || secondsLeft > 0}
              aria-busy={status === 'sending'}
              className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 kicker text-[0.62rem] text-paper transition-colors hover:bg-tan hover:text-ink disabled:cursor-not-allowed disabled:opacity-70"
              data-testid="contact-submit"
            >
              {status === 'sending' ? 'Sending...' : secondsLeft > 0 ? `Wait ${secondsLeft}s` : 'Send message'}
              <ArrowUpRight />
            </button>

            {secondsLeft > 0 ? (
              <p
                className="font-sans text-sm text-ink-soft"
                role="status"
                data-testid="contact-cooldown"
              >
                One message per minute. You can send another in {secondsLeft}s.
              </p>
            ) : null}
          </div>
        </form>
      </div>
      </div>
    </section>
  )
}

function App() {
  useScrollReveal()

  return (
    <div id="top" className="grain min-h-screen bg-paper text-ink" data-state="ready">
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <SiteFooter />
      <ToastHost />
      <CustomCursor />
    </div>
  )
}
