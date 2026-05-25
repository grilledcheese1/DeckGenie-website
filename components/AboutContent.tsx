'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const GITHUB_URL = 'https://github.com/grilledcheese1/DeckGenie'

const MINI_FEATURES = [
  {
    char: '词',
    title: 'Only words you know',
    desc: 'Every AI-generated sentence is constrained to your personal vocabulary set. No surprises.',
  },
  {
    char: '评',
    title: 'Natural grading',
    desc: 'Your answer is scored semantically. Paraphrasing counts. Exact match is not the goal.',
  },
  {
    char: '记',
    title: 'Tracks what sticks',
    desc: 'Words you miss surface more often. Words you nail fade into the background. Automatic.',
  },
]

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.fromTo(
          containerRef.current?.querySelectorAll('.about-block') ?? [],
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* ── HERO ── */}
      <section
        className="about-block"
        style={{
          position: 'relative',
          padding: '96px 32px 80px',
          maxWidth: 860,
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {/* Watermark */}
        <div
          aria-hidden
          className="font-hanzi"
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-4%',
            fontSize: 'clamp(10rem, 22vw, 18rem)',
            color: 'var(--text-primary)',
            opacity: 0.03,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          学
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
            letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 20,
          }}>
            Built by a student, for students
          </div>

          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            margin: '0 0 24px',
          }}>
            I built this because{' '}
            <br />
            Duolingo wasn&apos;t cutting it.
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: 620,
          }}>
            I was taking Mandarin and hitting a wall. I could recognize characters, ace vocabulary tests,
            and recite tones on command — but when it came to producing actual sentences from scratch,
            I was guessing. Every practice tool I tried used words I hadn&apos;t learned yet,
            or drilled me with the same ten sentences until I was memorizing patterns instead of thinking.
          </p>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section
        className="about-block"
        style={{
          padding: '0 32px 80px',
          maxWidth: 860,
          margin: '0 auto',
          borderTop: '1px solid var(--border)',
          paddingTop: 64,
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr minmax(0, 360px)',
          gap: 48,
          alignItems: 'start',
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
              letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 20,
            }}>
              The problem
            </div>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              margin: '0 0 24px',
            }}>
              Sentence practice is where retention actually happens.{' '}
              <span className="font-hanzi" style={{ color: 'var(--hanzi-color)' }}>
                语境学习。
              </span>
            </h2>

            <p style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: 24,
            }}>
              Flashcards build recognition. Sentences build production. There&apos;s a meaningful gap
              between knowing what 意思 means and using it in a sentence you construct yourself under pressure.
              That gap is where I kept failing.
            </p>

            <p style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: 32,
            }}>
              Standard apps either drill you on sentences full of unknown words, or they let you
              look everything up — which isn&apos;t practice, it&apos;s cheating. I wanted something
              that felt like a real exam: sentences built only from vocabulary I&apos;d actually studied,
              graded on meaning, not exact wording.
            </p>

            {/* Quote callout */}
            <blockquote style={{
              margin: 0,
              padding: '20px 24px',
              borderLeft: '3px solid var(--accent)',
              backgroundColor: 'rgba(5, 150, 105, 0.06)',
              borderRadius: '0 10px 10px 0',
            }}>
              <p style={{
                fontSize: 15,
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                margin: 0,
                fontStyle: 'italic',
              }}>
                &ldquo;I kept seeing 看 and 说 in sentences with words I&apos;d never encountered.
                That&apos;s not practice. That&apos;s guessing dressed up as learning.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Mini sentence card mockup */}
          <div>
            <MiniSentenceCard />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section:has(.about-block) > div {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── WHAT I BUILT ── */}
      <section
        className="about-block"
        style={{
          padding: '64px 32px 80px',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
            letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 20,
          }}>
            What I built
          </div>

          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            maxWidth: 540,
            margin: '0 0 48px',
          }}>
            A practice loop designed around how retention actually works.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginBottom: 48,
          }}>
            {MINI_FEATURES.map(f => (
              <div
                key={f.char}
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--card-radius)',
                  padding: '20px',
                }}
              >
                <div
                  className="font-hanzi"
                  style={{ fontSize: '2rem', color: 'var(--hanzi-color)', marginBottom: 12, lineHeight: 1 }}
                >
                  {f.char}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 15, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
            Built with <strong style={{ color: 'var(--text-secondary)' }}>Next.js</strong>,{' '}
            <strong style={{ color: 'var(--text-secondary)' }}>Supabase</strong>, and the{' '}
            <strong style={{ color: 'var(--text-secondary)' }}>Claude API</strong> for sentence generation and grading.
          </p>

          <style>{`
            @media (max-width: 640px) {
              section > div > div[style*="repeat(3"] {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ── BUILDER BIO ── */}
      <section
        className="about-block"
        style={{
          padding: '64px 32px 96px',
          maxWidth: 860,
          margin: '0 auto',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap' as const,
          gap: 24,
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
              letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16,
            }}>
              The builder
            </div>
            <div style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: 6,
            }}>
              grilledcheese1
            </div>
            <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 4 }}>
              University student
            </div>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '11px 22px',
              borderRadius: 'var(--button-radius)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--text-primary)'
              el.style.borderColor = 'var(--text-tertiary)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--text-secondary)'
              el.style.borderColor = 'var(--border)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View source on GitHub
          </a>
        </div>
      </section>
    </div>
  )
}

function MiniSentenceCard() {
  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--card-radius)',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
    }}>
      <div style={{ height: 3, backgroundColor: 'var(--bg-tertiary)', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '60%', backgroundColor: 'var(--accent)', borderRadius: 2,
        }} />
      </div>
      <div style={{ padding: '20px 20px 18px' }}>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 12 }}>
          Sentence 6 of 10
        </div>
        <div style={{ fontSize: 12, color: 'var(--accent-text)', marginBottom: 6, letterSpacing: '0.04em' }}>
          Wǒ hěn xǐhuān xuéxí zhōngwén
        </div>
        <div
          className="font-hanzi"
          style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.3 }}
        >
          我很喜欢学习中文
        </div>
        <div style={{
          padding: '10px 14px',
          borderRadius: 8,
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          border: '1px solid rgba(5, 150, 105, 0.3)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-text)', marginBottom: 2 }}>
            ✓ Correct · 92/100
          </div>
          <div style={{ fontSize: 11, color: 'var(--accent-text)', opacity: 0.75 }}>
            I really enjoy studying Chinese.
          </div>
        </div>
      </div>
    </div>
  )
}
