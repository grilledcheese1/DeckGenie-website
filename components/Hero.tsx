'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

const HANZI_CHARS = ['音', '吉']

const NEON_SIGNS = [
  { text: '坚持', top: '12%', left: '-2%', size: 1.8, delay: 0.6 },
  { text: '学习', top: '55%', left: '2%', size: 2.4, delay: 1.2 },
  { text: '进步', top: '20%', right: '1%', size: 2.0, delay: 0.9 },
  { text: '练习', top: '62%', right: '-1%', size: 1.6, delay: 1.5 },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const showAll = () => {
      charRefs.current.forEach(el => {
        if (el) {
          el.classList.remove('clip-wipe')
          el.style.clipPath = 'inset(0 0% 0 0)'
        }
      })
      if (taglineRef.current) {
        taglineRef.current.classList.remove('gsap-hidden')
        taglineRef.current.style.opacity = '1'
        taglineRef.current.style.transform = 'none'
      }
      if (ctaRef.current) {
        ctaRef.current.classList.remove('gsap-hidden')
        ctaRef.current.style.opacity = '1'
        ctaRef.current.style.transform = 'none'
      }
      if (mockupRef.current) {
        mockupRef.current.classList.remove('gsap-hidden')
        mockupRef.current.style.opacity = '1'
        mockupRef.current.style.transform = 'none'
      }
    }

    const handlePageShow = (e: PageTransitionEvent) => { if (e.persisted) showAll() }
    window.addEventListener('pageshow', handlePageShow)

    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const isBackNav = navEntry?.type === 'back_forward'

    if (prefersReduced || isBackNav) {
      showAll()
      return () => window.removeEventListener('pageshow', handlePageShow)
    }

    // Strip CSS hiding classes so GSAP exclusively owns visibility via inline styles.
    // The classes remain in JSX for SSR (prevents FOUC), but from this point forward
    // no CSS class can re-assert itself after a re-render or bfcache restore.
    charRefs.current.forEach(el => el?.classList.remove('clip-wipe'))
    taglineRef.current?.classList.remove('gsap-hidden')
    ctaRef.current?.classList.remove('gsap-hidden')
    mockupRef.current?.classList.remove('gsap-hidden')

    // Re-establish hidden state as pure inline style before animating
    gsap.set(charRefs.current.filter(Boolean), { clipPath: 'inset(0 100% 0 0)' })
    gsap.set(taglineRef.current, { opacity: 0, y: 20 })
    gsap.set(ctaRef.current,     { opacity: 0, y: 16 })
    gsap.set(mockupRef.current,  { opacity: 0, y: 24, scale: 0.97 })

    let tl: gsap.core.Timeline | undefined

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ delay: 0.2 })

      tl.to(
        charRefs.current.filter(Boolean),
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.65,
          stagger: 0.12,
          ease: 'power3.out',
        }
      )
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to(ctaRef.current,     { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to(mockupRef.current,  { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    }, sectionRef)

    // Jump the animation to its end state before bfcache freezes the page,
    // so elements are captured as fully visible regardless of when the user navigated away.
    const handlePageHide = () => tl?.progress(1)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      ctx.kill()
      window.removeEventListener('pagehide', handlePageHide)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 32px',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric orbs */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--orb-emerald) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '8%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--orb-teal) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Vertical neon sign decorations */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.12,
      }}>
        {NEON_SIGNS.map((sign, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: sign.top,
              left: 'left' in sign ? sign.left : undefined,
              right: 'right' in sign ? (sign as typeof sign & { right: string }).right : undefined,
              writingMode: 'vertical-rl',
              fontSize: `${sign.size}rem`,
              fontFamily: 'var(--font-noto-serif-sc), serif',
              color: 'var(--hanzi-color)',
              letterSpacing: '0.1em',
              animationName: 'neon-flicker',
              animationDuration: '8s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${sign.delay}s`,
              textShadow: '0 0 12px var(--hanzi-color)',
            }}
          >
            {sign.text}
          </div>
        ))}
      </div>

      {/* Main layout: hero content + mockup */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1200,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 480px)',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* Left: headline + tagline + CTAs */}
        <div>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 24,
            padding: '4px 12px',
            borderRadius: 'var(--button-radius)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-secondary)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
          }}>
            <span>HSK 1–6</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(4rem, 10vw, 7rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
          }}>
            {HANZI_CHARS.map((char, i) => (
              <span
                key={i}
                ref={el => { charRefs.current[i] = el }}
                className="clip-wipe font-hanzi"
                style={{ color: 'var(--text-primary)', display: 'inline-block' }}
              >
                {char}
              </span>
            ))}
          </h1>
          <div
            className="font-hanzi"
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              color: 'var(--text-tertiary)',
              marginBottom: 28,
              letterSpacing: '0.12em',
            }}
          >
            Inkitsu
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="gsap-hidden"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: 520,
              marginBottom: 40,
            }}
          >
            Learn Mandarin the way your brain actually works.
            <br />
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Automated sentences. Real vocab. Constant repetition.
            </span>
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="gsap-hidden" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <a
              href={`${APP_URL}/signup`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '12px 28px',
                borderRadius: 'var(--button-radius)',
                backgroundColor: 'var(--accent)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              Start for free →
            </a>
            <button
              onClick={() => gsap.to(window, {
                scrollTo: { y: '#practice-preview', offsetY: 80 },
                duration: 0.15,
                ease: 'power3.inOut',
              })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 28px',
                borderRadius: 'var(--button-radius)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: 15,
                fontWeight: 500,
                background: 'transparent',
                cursor: 'pointer',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--text-tertiary)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
              }}
            >
              See how it works
            </button>
          </div>
        </div>

        {/* Right: SentenceCard mockup */}
        <div
          ref={mockupRef}
          className="gsap-hidden"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SentenceCardMockup />
        </div>
      </div>

      {/* Responsive: hide mockup on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #hero > div {
            grid-template-columns: 1fr !important;
          }
          #hero > div > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

function SentenceCardMockup() {
  return (
    <div style={{
      width: '100%',
      maxWidth: 420,
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--card-radius)',
      boxShadow: '0 0 0 1px var(--border-accent), var(--card-shadow)',
      overflow: 'hidden',
      fontFamily: 'var(--font-dm-sans), sans-serif',
    }}>
      {/* Progress bar */}
      <div style={{ height: 4, backgroundColor: 'var(--bg-tertiary)', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '40%', backgroundColor: 'var(--accent)',
          borderRadius: 2,
        }} />
      </div>

      <div style={{ padding: '28px 28px 24px' }}>
        {/* Label */}
        <div style={{
          fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)',
          letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 20,
        }}>
          Sentence 4 of 10
        </div>

        {/* Translate prompt */}
        <div style={{
          fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12,
        }}>
          Translate into English:
        </div>

        {/* Pinyin */}
        <div style={{
          fontSize: 13, color: 'var(--accent-text)',
          letterSpacing: '0.06em', marginBottom: 8,
        }}>
          Zhè běn shū hěn yǒuyìsi
        </div>

        {/* Chinese sentence */}
        <div
          className="font-hanzi"
          style={{
            fontSize: 'clamp(2rem, 6vw, 2.75rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: 24,
            letterSpacing: '0.05em',
          }}
        >
          这本书很有意思
        </div>

        {/* Vocab chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 24 }}>
          {['书 (shū)', '有意思 (yǒuyìsi)'].map(w => (
            <span key={w} className="font-hanzi" style={{
              padding: '3px 10px',
              borderRadius: 6,
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              fontSize: 12,
              color: 'var(--text-secondary)',
            }}>
              {w}
            </span>
          ))}
        </div>

        {/* Grade result */}
        <div style={{
          padding: '12px 16px',
          borderRadius: 10,
          backgroundColor: 'rgba(5, 150, 105, 0.12)',
          border: '1px solid rgba(5, 150, 105, 0.35)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 4,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-text)' }}>
              ✓ Correct
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-text)' }}>
              95/100
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--accent-text)', opacity: 0.8 }}>
            This book is very interesting. Great work!
          </div>
        </div>
      </div>
    </div>
  )
}
