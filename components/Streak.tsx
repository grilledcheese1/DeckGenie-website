'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const STATS = [
  { value: 5000, suffix: '+', label: 'words in the HSK corpus', char: '词' },
  { value: 3, suffix: '', label: 'themes to choose from', char: '主' },
  { value: 6, suffix: '', label: 'HSK levels covered', char: '级' },
]

const FLAMES = [1, 2, 3, 4, 5, 6]

export default function Streak() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const showAll = () => {
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (el) el.textContent = stat.value.toLocaleString()
      })
      if (sectionRef.current) {
        sectionRef.current.querySelectorAll('.streak-card').forEach((el) => {
          (el as HTMLElement).style.opacity = '1'
        })
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

    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString()
          },
        })
      })

      if (sectionRef.current) {
        const cards = sectionRef.current.querySelectorAll('.streak-card')
        gsap.set(cards, { opacity: 0 })
        gsap.to(cards, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)

    return () => {
      ctx.kill()
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'var(--section-gap) 32px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
          letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16,
        }}>
          Stay consistent
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          margin: '0 0 16px',
        }}>
          Build your streak.{' '}
          <span className="font-hanzi" style={{ color: 'var(--hanzi-color)' }}>
            坚持就是胜利。
          </span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto' }}>
          Keep your momentum. Every session counts. Every character learned stacks.
        </p>
      </div>

      {/* Flame row */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 64,
        flexWrap: 'wrap' as const,
      }}>
        {FLAMES.map((n, i) => (
          <div
            key={n}
            style={{
              position: 'relative',
              width: 72,
              height: 96,
              opacity: i < 4 ? 1 : 0.3,
              filter: i < 4 ? 'none' : 'grayscale(0.5)',
              transition: 'opacity 0.2s, filter 0.2s',
            }}
          >
            <Image
              src={`/flames/streak_flame_${n}.png`}
              alt={`Streak day ${n}`}
              fill
              style={{ objectFit: 'contain' }}
              sizes="72px"
            />
          </div>
        ))}
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }}>
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="streak-card"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--card-radius)',
              padding: '32px 28px',
              textAlign: 'center',
            }}
          >
            <div
              className="font-hanzi"
              style={{
                fontSize: '2.5rem',
                color: 'var(--text-tertiary)',
                marginBottom: 16,
                lineHeight: 1,
              }}
            >
              {stat.char}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: 2,
              marginBottom: 8,
            }}>
              <span
                ref={el => { counterRefs.current[i] = el }}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              >
                0
              </span>
              <span style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: 'var(--accent)',
                lineHeight: 1.2,
              }}>
                {stat.suffix}
              </span>
            </div>
            <div style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          section > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
