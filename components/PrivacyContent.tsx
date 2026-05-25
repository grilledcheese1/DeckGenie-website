'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LAST_UPDATED = 'May 2026'

const TOC = [
  { id: 'what-we-collect', label: 'What we collect' },
  { id: 'how-we-use-it', label: 'How we use it' },
  { id: 'third-parties', label: 'Third-party services' },
  { id: 'data-retention', label: 'Data retention' },
  { id: 'your-rights', label: 'Your rights' },
  { id: 'acceptable-use', label: 'Acceptable use' },
  { id: 'no-warranties', label: 'No warranties' },
  { id: 'contact', label: 'Contact' },
]

export default function PrivacyContent() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!prefersReduced && headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        )
      }
    })

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => { ctx.revert(); observer.disconnect() }
  }, [])

  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      minHeight: '100vh',
      padding: '80px 32px 96px',
      position: 'relative',
    }}>
      {/* Watermark */}
      <div
        aria-hidden
        className="font-hanzi"
        style={{
          position: 'fixed',
          top: '50%',
          right: '-4%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(8rem, 18vw, 14rem)',
          color: 'var(--text-primary)',
          opacity: 0.02,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          writingMode: 'vertical-rl',
        }}
      >
        隐私
      </div>

      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: 64,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Sticky TOC */}
        <aside style={{
          position: 'sticky',
          top: 96,
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)',
            letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 12,
          }}>
            On this page
          </div>
          {TOC.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                fontSize: 13,
                color: activeId === item.id ? 'var(--accent-text)' : 'var(--text-tertiary)',
                textDecoration: 'none',
                padding: '5px 10px',
                borderLeft: activeId === item.id
                  ? '2px solid var(--accent)'
                  : '2px solid var(--border)',
                transition: 'color 0.2s ease, border-color 0.2s ease',
                lineHeight: 1.4,
              }}
              onMouseEnter={e => {
                if (activeId !== item.id)
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
              }}
              onMouseLeave={e => {
                if (activeId !== item.id)
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'
              }}
            >
              {item.label}
            </a>
          ))}
        </aside>

        {/* Main content */}
        <div>
          {/* Header */}
          <div ref={headerRef} style={{ marginBottom: 64 }}>
            <div style={{
              fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
              letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16,
            }}>
              Legal
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              margin: '0 0 16px',
            }}>
              Privacy &amp; Terms
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-tertiary)', margin: '0 0 8px' }}>
              Last updated: {LAST_UPDATED}
            </p>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
              We collect the minimum needed to make the app work. No ads, no selling your data,
              no third-party tracking beyond what Supabase and the Claude API require to function.
            </p>
          </div>

          {/* ── PRIVACY POLICY ── */}
          <SectionHead label="Privacy Policy" />

          <PolicySection id="what-we-collect" title="What we collect">
            <p>
              汉字练习 uses Supabase for authentication and data storage. The following tables describe
              exactly what is stored on your behalf when you create an account and use the app:
            </p>

            <SchemaTable rows={[
              {
                table: 'auth.users',
                managed: 'Supabase Auth',
                fields: 'Email address, hashed password (we never see the plain text), account created timestamp.',
              },
              {
                table: 'settings',
                fields: 'Your starting HSK level (1–6), grading strictness preference, sentences per round, rounds before a vocabulary unlock, words unlocked per round, pinyin display mode (always / tap / never), hints display mode (before / after / never), and timestamps.',
              },
              {
                table: 'vocab_list',
                fields: 'Each vocabulary word you have unlocked: the Chinese character(s), pinyin, English meaning, part of speech, topic tag, HSK level, when it was unlocked, how many times you have seen and answered it correctly, the last time you saw it, the last time you answered it correctly, and its current mastery level (learning / reviewing / mastered).',
              },
              {
                table: 'progress',
                fields: 'Your cumulative totals: rounds completed, sentences completed, sentences in the current round, current round number, rolling accuracy percentage, current streak in days, longest streak ever, the last time you practiced, and which unlock you last claimed.',
              },
              {
                table: 'daily_stats',
                fields: 'One row per calendar day: sentences attempted, sentences answered correctly, rounds completed, and words seen that day. Used to display your activity history.',
              },
              {
                table: 'round_summaries',
                fields: 'One row per completed round: round number, total sentences, correct sentences, accuracy percentage, longest in-round streak, and the strictness level used.',
              },
              {
                table: 'sentence_attempts',
                fields: 'One row per graded sentence: the Chinese sentence, its pinyin, your typed answer, the correct answer, your score (0–100), whether it was marked correct, the strictness used, the vocabulary words that appeared in the sentence, and the timestamp.',
              },
            ]} />

            <p>
              We do <strong>not</strong> collect your name, phone number, location, payment information,
              or any information beyond what is listed above. We do not use advertising cookies or
              third-party analytics trackers.
            </p>
          </PolicySection>

          <PolicySection id="how-we-use-it" title="How we use it">
            <p>Your data is used exclusively to:</p>
            <ul>
              <li>Authenticate you and keep your session secure</li>
              <li>Generate AI sentences using only your known vocabulary</li>
              <li>Track your accuracy per word and surface struggling words more often</li>
              <li>Restore your progress when you return to the app</li>
              <li>Remember your theme and display preferences</li>
            </ul>
            <p>
              Your practice data is never used to train AI models. Sentences submitted to the Claude
              API for grading are not retained by us beyond the immediate API call.
            </p>
          </PolicySection>

          <PolicySection id="third-parties" title="Third-party services">
            <p>汉字练习 uses the following third-party services:</p>
            <ul>
              <li>
                <strong>Supabase</strong> — authentication and database hosting.
                Your account data lives in a Supabase project.{' '}
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--accent-text)' }}>
                  Supabase Privacy Policy →
                </a>
              </li>
              <li>
                <strong>Anthropic (Claude API)</strong> — AI sentence generation and answer grading.
                Each sentence and your typed translation are sent to the Claude API to produce a score
                and feedback. Anthropic&apos;s data handling applies.{' '}
                <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--accent-text)' }}>
                  Anthropic Privacy Policy →
                </a>
              </li>
            </ul>
            <p>
              There are no advertising networks, analytics trackers, or data brokers involved.
            </p>
          </PolicySection>

          <PolicySection id="data-retention" title="Data retention">
            <p>
              Your data persists in Supabase for as long as your account exists. Deleting your account
              removes all associated practice data, settings, and authentication records.
            </p>
            <p>
              To request account deletion, email us at the address in the Contact section below.
              We will process deletion within 7 days.
            </p>
          </PolicySection>

          <PolicySection id="your-rights" title="Your rights">
            <p>You have the right to:</p>
            <ul>
              <li>Access a copy of the data stored about you</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and all associated data</li>
              <li>Withdraw consent at any time by deleting your account</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at the email address below.
            </p>
          </PolicySection>

          {/* ── TERMS OF USE ── */}
          <SectionHead label="Terms of Use" />

          <PolicySection id="acceptable-use" title="Acceptable use">
            <p>
              汉字练习 is a personal study tool. By using it, you agree not to:
            </p>
            <ul>
              <li>Scrape, reverse-engineer, or redistribute the app or its API</li>
              <li>Share account credentials with others</li>
              <li>Use the app in any way intended to harm, spam, or abuse Supabase or Anthropic infrastructure</li>
            </ul>
            <p>
              The app is provided free of charge for personal educational use. Commercial use is not permitted without written consent.
            </p>
          </PolicySection>

          <PolicySection id="no-warranties" title="No warranties">
            <p>
              汉字练习 is a student project, provided <strong>as-is</strong> without warranty of any kind.
              We make no guarantees about uptime, accuracy of grading, or suitability for any particular
              purpose — including passing your Chinese class (though we hope it helps).
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue the service at any time without notice.
            </p>
          </PolicySection>

          <PolicySection id="contact" title="Contact">
            <p>
              Questions about your data, deletion requests, or anything else:
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>Email:</strong>{' '}
              <a href="mailto:karlmchazlettjr@gmail.com" style={{ color: 'var(--accent-text)' }}>
                karlmchazlettjr@gmail.com
              </a>
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 24 }}>
              This policy was last updated {LAST_UPDATED}. We&apos;ll post any changes here with a new date.
            </p>
          </PolicySection>
        </div>
      </div>

      {/* Hide TOC on mobile */}
      <style>{`
        @media (max-width: 860px) {
          .privacy-layout {
            grid-template-columns: 1fr !important;
          }
          aside {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function SectionHead({ label }: { label: string }) {
  return (
    <div style={{
      marginBottom: 32,
      marginTop: 56,
      paddingBottom: 12,
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: 'var(--accent-text)',
        letterSpacing: '0.12em', textTransform: 'uppercase' as const,
      }}>
        {label}
      </div>
    </div>
  )
}

function PolicySection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      style={{
        marginBottom: 48,
        scrollMarginTop: 96,
      }}
    >
      <h2 style={{
        fontSize: '1.15rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        margin: '0 0 16px',
      }}>
        {title}
      </h2>
      <div style={{
        fontSize: 15,
        color: 'var(--text-secondary)',
        lineHeight: 1.75,
      }}>
        {children}
      </div>
    </section>
  )
}

function SchemaTable({ rows }: { rows: { table: string; managed?: string; fields: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '16px 0 20px' }}>
      {rows.map(row => (
        <div key={row.table} style={{
          padding: '14px 16px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <code style={{
              fontSize: 13, fontWeight: 600, color: 'var(--hanzi-color)',
              backgroundColor: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: 4,
            }}>
              {row.table}
            </code>
            {row.managed && (
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                managed by {row.managed}
              </span>
            )}
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            {row.fields}
          </p>
        </div>
      ))}
    </div>
  )
}
