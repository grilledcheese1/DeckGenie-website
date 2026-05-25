'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
    })

    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        backgroundColor: scrolled ? 'rgba(12, 10, 9, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <a
        href="#hero"
        className="font-hanzi"
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--hanzi-color)',
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}
      >
        汉字
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <a
          href={`${APP_URL}/login`}
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            padding: '9px 20px',
            borderRadius: 'var(--button-radius)',
            border: '1px solid var(--border)',
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
          Log in
        </a>
        <a
          href={`${APP_URL}/signup`}
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: '#fff',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: 'var(--button-radius)',
            backgroundColor: 'var(--accent)',
            border: '1px solid transparent',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)'
          }}
        >
          Get Started
        </a>
      </div>
    </nav>
  )
}
