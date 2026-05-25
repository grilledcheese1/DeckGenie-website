'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!prefersReduced && contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.96, y: 20 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: contentRef.current, start: 'top 85%' },
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
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        className="font-hanzi"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(12rem, 30vw, 24rem)',
          color: 'var(--text-primary)',
          opacity: 0.025,
          userSelect: 'none',
          lineHeight: 1,
          pointerEvents: 'none',
          zIndex: 0,
          whiteSpace: 'nowrap' as const,
        }}
      >
        汉字
      </div>

      {/* Atmospheric orb */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, var(--orb-jade) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 680,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div style={{
          fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
          letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 24,
        }}>
          Ready to begin?
        </div>

        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          color: 'var(--text-primary)',
          margin: '0 0 20px',
        }}>
          Ready to start?
        </h2>

        <p style={{
          fontSize: 18,
          color: 'var(--text-secondary)',
          marginBottom: 40,
          lineHeight: 1.6,
        }}>
          It&apos;s free to begin. No payment required.
        </p>

        <a
          href={`${APP_URL}/signup`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 36px',
            borderRadius: 'var(--button-radius)',
            backgroundColor: 'var(--accent)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
            boxShadow: '0 0 32px rgba(5, 150, 105, 0.25)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.backgroundColor = 'var(--accent-hover)'
            el.style.transform = 'translateY(-2px)'
            el.style.boxShadow = '0 0 48px rgba(5, 150, 105, 0.4)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.backgroundColor = 'var(--accent)'
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = '0 0 32px rgba(5, 150, 105, 0.25)'
          }}
        >
          Create your account →
        </a>

        <div style={{
          marginTop: 24,
          fontSize: 13,
          color: 'var(--text-tertiary)',
        }}>
          Already have an account?{' '}
          <a
            href={APP_URL}
            style={{ color: 'var(--accent-text)', textDecoration: 'none' }}
          >
            Log in →
          </a>
        </div>
      </div>
    </section>
  )
}
