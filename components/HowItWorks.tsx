'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    number: '01',
    char: '选',
    title: 'Pick your HSK level',
    desc: 'Choose from HSK 1 through 6. The app loads the vocabulary set that matches exactly where you are.',
  },
  {
    number: '02',
    char: '译',
    title: 'Translate AI-generated sentences',
    desc: 'Every sentence is freshly generated using only words you know. No sentence ever repeats.',
  },
  {
    number: '03',
    char: '评',
    title: 'Get instant graded feedback',
    desc: 'Your answer is scored out of 100. Partial credit. Natural paraphrase accepted. Real feedback.',
  },
  {
    number: '04',
    char: '解',
    title: 'Unlock new words as you progress',
    desc: 'Complete rounds to earn new vocabulary. Build your personal word set one unlock at a time.',
  },
  {
    number: '05',
    char: '析',
    title: 'Analyze any character in depth',
    desc: 'Tap any character at any time — pinyin, radical, tone, stroke count, and your accuracy history.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!prefersReduced && stepsRef.current) {
        gsap.fromTo(
          stepsRef.current.querySelectorAll('.how-step'),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'var(--section-gap) 32px',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
            letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16,
          }}>
            How it works
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            maxWidth: 520,
            margin: '0 auto',
          }}>
            Five steps to{' '}
            <span className="font-hanzi" style={{ color: 'var(--hanzi-color)' }}>
              流利
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* Connector line */}
          <div aria-hidden style={{
            position: 'absolute',
            top: 36,
            left: '10%',
            right: '10%',
            height: 1,
            backgroundColor: 'var(--border)',
            zIndex: 0,
          }} />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="how-step"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 16px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Number circle */}
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: i === 0 ? 'var(--accent)' : 'var(--bg-tertiary)',
                border: `1px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                flexShrink: 0,
              }}>
                <span
                  className="font-hanzi"
                  style={{
                    fontSize: '1.75rem',
                    color: i === 0 ? '#fff' : 'var(--hanzi-color)',
                    lineHeight: 1,
                  }}
                >
                  {step.char}
                </span>
              </div>

              <div style={{
                fontSize: 11, fontWeight: 600,
                color: i === 0 ? 'var(--accent-text)' : 'var(--text-tertiary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                marginBottom: 8,
              }}>
                Step {step.number}
              </div>
              <h3 style={{
                fontSize: 15, fontWeight: 600, color: 'var(--text-primary)',
                margin: '0 0 8px', lineHeight: 1.3,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Responsive: vertical on mobile */}
        <style>{`
          @media (max-width: 900px) {
            section:has(.how-step) > div > div:last-child {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
            section:has(.how-step) > div > div:last-child > div:first-child {
              display: none !important;
            }
            .how-step {
              align-items: flex-start !important;
              text-align: left !important;
              flex-direction: row !important;
              gap: 16px !important;
            }
            .how-step > div:first-child {
              flex-shrink: 0 !important;
              width: 48px !important;
              height: 48px !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
