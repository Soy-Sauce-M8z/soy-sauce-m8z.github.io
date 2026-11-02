import { useEffect, useRef, useState } from 'react'
import { navLinks, profile } from '../data/portfolio'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const spacerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)

      const marker = window.scrollY + window.innerHeight * 0.35
      let current: string | null = null
      for (const link of navLinks) {
        const section = document.querySelector(link.href)
        if (!section) continue
        const rect = section.getBoundingClientRect()
        const top = rect.top + window.scrollY
        if (marker >= top && marker < top + rect.height) current = link.href
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Some embedded/older engines fail to honour `position: sticky`, which lets the
  // bar scroll away. Detect that and pin the bar with JS instead.
  useEffect(() => {
    const header = headerRef.current
    const spacer = spacerRef.current
    if (!header || !spacer) return

    let mode: 'sticky' | 'fixed' | 'absolute' = 'sticky'
    let frame = 0

    const pin = () => {
      frame = 0
      const headerHeight = header.offsetHeight

      if (mode === 'sticky') {
        if (header.getBoundingClientRect().top >= -1) return
        mode = 'fixed'
        header.style.position = 'fixed'
        header.style.top = '0'
        header.style.left = '0'
        header.style.right = '0'
        header.style.width = '100%'
        spacer.style.height = `${headerHeight}px`
      }

      if (mode === 'fixed' && header.getBoundingClientRect().top < -1) {
        mode = 'absolute'
        header.style.position = 'absolute'
      }

      if (mode === 'absolute') {
        header.style.top = `${Math.max(window.scrollY, 0)}px`
        spacer.style.height = `${headerHeight}px`
      }
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(pin)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const goToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    setOpen(false)

    const headerHeight = event.currentTarget.closest('header')?.clientHeight ?? 0
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-[65] border-b bg-paper transition-colors duration-300 ${
          scrolled ? 'border-line shadow-[0_1px_0_0_hsl(var(--line))]' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-4 sm:h-[74px] sm:px-7">
          <a href="/" className="flex items-baseline gap-1.5" aria-label={`${profile.name}, back to top`}>
            <span className="display text-[1.7rem] leading-none text-ink sm:text-[2rem]">Sai</span>
            <span className="mb-1 size-1.5 rounded-full bg-tan" aria-hidden="true" />
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`/${link.href}`}
                onClick={(event) => goToSection(event, link.href)}
                aria-current={active === link.href ? 'true' : undefined}
                className={`kicker relative text-[0.62rem] transition-colors hover:text-tan-deep ${
                  active === link.href ? 'text-tan-deep' : 'text-ink'
                }`}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span
                  className={`nav-underline ${active === link.href ? 'is-active' : ''}`}
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#contact"
              className="hidden items-center gap-2 rounded-full bg-tan-deep px-5 py-2.5 kicker text-[0.62rem] text-paper transition-colors hover:bg-ink lg:inline-flex"
              data-testid="header-contact-cta"
            >
              Get in touch
            </a>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
              data-testid="menu-toggle"
            >
              <span className={`hamburger ${open ? 'is-open' : ''}`} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <div id="mobile-nav" className="border-t border-line bg-paper px-4 pt-3 pb-6 lg:hidden">
            <nav aria-label="Sections" className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={(event) => goToSection(event, link.href)}
                  className="display flex items-center justify-between border-b border-line py-3 text-2xl text-ink"
                >
                  {link.label}
                  <span className="size-2 rounded-full bg-tan-deep" aria-hidden="true" />
                </a>
              ))}
            </nav>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-5 block rounded-full bg-tan-deep py-3 text-center kicker text-[0.62rem] text-paper"
            >
              Get in touch
            </a>
          </div>
        ) : null}
      </header>
      <div ref={spacerRef} aria-hidden="true" />
    </>
  )
}

const socials = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
  { label: 'Devpost', href: profile.devpost },
]

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1320px] px-4 pt-14 pb-8 sm:px-7">
        <div className="flex flex-col gap-10 border-b border-paper/15 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="kicker text-[0.62rem] text-tan">Say hello</p>
            <a
              href="/"
              className="display mt-3 block text-[clamp(2rem,5vw,3.4rem)] text-paper transition-colors hover:text-tan"
            >
              Sai Thiruveedula<span className="text-tan">.</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="kicker text-[0.6rem] text-paper/50">Sections</p>
              <ul className="mt-3 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={`/${link.href}`} className="font-sans text-sm text-paper/80 transition-colors hover:text-tan">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker text-[0.6rem] text-paper/50">Elsewhere</p>
              <ul className="mt-3 space-y-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-sans text-sm text-paper/80 transition-colors hover:text-tan"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker text-[0.6rem] text-paper/50">Direct</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-sans text-sm break-all text-paper/80 transition-colors hover:text-tan"
                  >
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a href={profile.smsHref} className="font-sans text-sm text-paper/80 transition-colors hover:text-tan">
                    {profile.phone}
                  </a>
                </li>
                <li className="font-sans text-sm text-paper/60">{profile.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/15 pt-6 font-sans text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sai Thiruveedula. All rights reserved.</p>
          <a href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-tan">
            Back to top
            <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M8 13V3M4 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
