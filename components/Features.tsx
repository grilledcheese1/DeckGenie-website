'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FEATURE_CARDS = [
  {
    char: '每',
    title: 'AI Sentence Generation',
    desc: "Every sentence is built from YOUR vocabulary. The AI never uses words you don't know yet.",
  },
  {
    char: '习',
    title: 'Spaced Repetition',
    desc: 'Words you struggle with appear more often. The app learns what you need to practice.',
  },
  {
    char: '析',
    title: 'Character Analysis',
    desc: 'Tap any character mid-sentence. See pinyin, radical, tone, and your personal accuracy.',
  },
  {
    char: '解',
    title: 'Progressive Unlocks',
    desc: 'Complete rounds to unlock new vocabulary. Filter by topic, grammar type, or HSK level.',
  },
  {
    char: '主',
    title: 'Three Themes',
    desc: 'Ink & Jade. Vermillion & Cream. Bamboo Light. Pick the aesthetic that keeps you coming back.',
  },
  {
    char: '绩',
    title: 'Session Summary',
    desc: 'Every round ends with a full breakdown. Review what you missed. Track your streak.',
  },
]

const THEMES = [
  {
    name: 'Ink & Jade',
    bg: '#0c0a09',
    bgCard: '#1c1917',
    border: '#292524',
    accent: '#059669',
    accentText: '#6ee7b7',
    text: '#f5f5f4',
    textMuted: '#a8a29e',
    hanzi: '#34d399',
  },
  {
    name: 'Vermillion & Cream',
    bg: '#fdf6ec',
    bgCard: '#f5ead8',
    border: '#e8d5b7',
    accent: '#c0392b',
    accentText: '#c0392b',
    text: '#2c1810',
    textMuted: '#7c5c3e',
    hanzi: '#c0392b',
  },
  {
    name: 'Bamboo Light',
    bg: '#f9fafb',
    bgCard: '#f3f4f6',
    border: '#e5e7eb',
    accent: '#4d7c5f',
    accentText: '#4d7c5f',
    text: '#1a1a1a',
    textMuted: '#4b5563',
    hanzi: '#4d7c5f',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        if (gridRef.current) {
          gsap.fromTo(
            gridRef.current.querySelectorAll('.feature-card'),
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',
              },
            }
          )
        }
        if (row1Ref.current) {
          gsap.fromTo(
            row1Ref.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: row1Ref.current, start: 'top 80%' } }
          )
        }
        if (row2Ref.current) {
          gsap.fromTo(
            row2Ref.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: row2Ref.current, start: 'top 80%' } }
          )
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      style={{
        padding: 'var(--section-gap) 32px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Section label */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 64,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
          letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16,
        }}>
          What you get
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          maxWidth: 560,
          margin: 0,
        }}>
          Every tool you need to{' '}
          <span className="font-hanzi" style={{ color: 'var(--hanzi-color)' }}>
            真正学习
          </span>
        </h2>
        <p style={{
          fontSize: 16, color: 'var(--text-secondary)', marginTop: 16,
          maxWidth: 480, lineHeight: 1.65,
        }}>
          A system that matches how your brain actually learns.
        </p>
      </div>

      {/* 6-card grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          marginBottom: 80,
        }}
      >
        {FEATURE_CARDS.map(card => (
          <div
            key={card.char}
            className="feature-card"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--card-radius)',
              padding: 24,
              transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = 'var(--card-shadow-hover)'
              el.style.borderColor = 'var(--border-accent)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = ''
              el.style.borderColor = 'var(--border)'
              el.style.transform = ''
            }}
          >
            <div
              className="font-hanzi"
              style={{
                fontSize: '2.5rem',
                color: 'var(--hanzi-color)',
                marginBottom: 16,
                lineHeight: 1,
              }}
            >
              {card.char}
            </div>
            <h3 style={{
              fontSize: 17, fontWeight: 600, color: 'var(--text-primary)',
              margin: '0 0 8px',
            }}>
              {card.title}
            </h3>
            <p style={{
              fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6,
              margin: 0,
            }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 1024px) {
          #features > div:nth-child(3) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #features > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Highlight row 1 — Character analysis */}
      <div
        ref={row1Ref}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
          padding: '64px 0',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
            letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16,
          }}>
            Character Analysis
          </div>
          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: 20,
          }}>
            Tap any character.{' '}
            <span className="font-hanzi" style={{ color: 'var(--hanzi-color)' }}>
              读懂每个字。
            </span>
          </h3>
          <p style={{
            fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20,
          }}>
            Mid-sentence, curiosity strikes. Tap any character and instantly see its pinyin, tone number, radical breakdown, and your personal accuracy over time.
          </p>
          <p style={{
            fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7,
          }}>
            No dictionary app switching. No flow interruption. Just knowledge, exactly when you need it.
          </p>
        </div>

        {/* Analysis mockup */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CharAnalysisMockup />
        </div>
      </div>

      {/* Highlight row 2 — Theme showcase */}
      <div
        ref={row2Ref}
        style={{
          padding: '64px 0',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
            letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16,
          }}>
            Three Themes
          </div>
          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: 12,
          }}>
            Choose your aesthetic.{' '}
            <span className="font-hanzi" style={{ color: 'var(--hanzi-color)' }}>
              选你的风格。
            </span>
          </h3>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto' }}>
            The theme you choose is the one you&apos;ll open every day. All three are designed to keep you coming back.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}>
          {THEMES.map(theme => (
            <div key={theme.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <ThemeMockup theme={theme} />
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', textAlign: 'center' }}>
                {theme.name}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 640px) {
            #features > div:last-child > div:last-child {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}

function CharAnalysisMockup() {
  return (
    <div style={{
      width: 340,
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--card-radius)',
      boxShadow: 'var(--card-shadow)',
      padding: '28px',
      position: 'relative',
    }}>
      {/* Sentence display */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 10, letterSpacing: '0.05em' }}>
          我 很 喜 欢 学 习 中 文
        </div>
        <div className="font-hanzi" style={{
          fontSize: '2.5rem', lineHeight: 1.3, color: 'var(--text-primary)',
          letterSpacing: '0.08em',
        }}>
          我很喜欢
          <span style={{
            color: 'var(--hanzi-color)',
            borderBottom: '2px solid var(--accent)',
            position: 'relative',
          }}>
            学
          </span>
          习中文
        </div>
      </div>

      {/* Analysis tooltip */}
      <div style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-accent)',
        borderRadius: 12,
        padding: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div className="font-hanzi" style={{
            fontSize: '2.5rem', color: 'var(--hanzi-color)', lineHeight: 1,
          }}>学</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
              xué <span style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>· tone 2</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>to learn; to study</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'Radical', value: '子 (child)' },
            { label: 'Strokes', value: '8' },
            { label: 'HSK Level', value: 'HSK 1' },
            { label: 'Your accuracy', value: '92%' },
          ].map(item => (
            <div key={item.label} style={{
              padding: '8px 12px',
              borderRadius: 8,
              backgroundColor: 'var(--bg-secondary)',
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface Theme {
  name: string
  bg: string
  bgCard: string
  border: string
  accent: string
  accentText: string
  text: string
  textMuted: string
  hanzi: string
}

function ThemeMockup({ theme }: { theme: Theme }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: 280,
      borderRadius: 24,
      overflow: 'hidden',
      border: `1px solid ${theme.border}`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      backgroundColor: theme.bg,
    }}>
      {/* Status bar mock */}
      <div style={{
        height: 32, backgroundColor: theme.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 8,
      }}>
        <div style={{ width: 60, height: 6, borderRadius: 3, backgroundColor: theme.border }} />
      </div>

      {/* App content */}
      <div style={{ padding: '24px 20px 28px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            fontFamily: 'var(--font-noto-serif-sc), serif',
            fontSize: '2.5rem',
            color: theme.hanzi,
            lineHeight: 1,
            marginBottom: 4,
          }}>
            汉字
          </div>
          <div style={{ fontSize: 11, color: theme.textMuted, letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>
            Practice
          </div>
        </div>

        {/* Input mockup */}
        <div style={{
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.border}`,
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 10,
        }}>
          <div style={{ fontSize: 12, color: theme.textMuted }}>Email</div>
        </div>
        <div style={{
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.border}`,
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, color: theme.textMuted }}>Password</div>
        </div>

        {/* CTA */}
        <div style={{
          backgroundColor: theme.accent,
          borderRadius: 9999,
          padding: '10px',
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 600,
          color: theme.name === 'Ink & Jade' ? '#fff' : '#fff',
        }}>
          Sign in
        </div>
      </div>
    </div>
  )
}