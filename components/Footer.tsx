'use client'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const GITHUB_URL = 'https://github.com/grilledcheese1/DeckGenie'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      backgroundColor: 'var(--bg-primary)',
      padding: '48px 32px',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 24,
      }}>
        {/* Left: logo */}
        <div>
          <div
            className="font-hanzi"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--hanzi-color)',
              marginBottom: 4,
            }}
          >
            音吉
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
            © {year} 音吉
          </div>
        </div>

        {/* Center: attribution */}
        <div style={{
          fontSize: 13,
          color: 'var(--text-tertiary)',
          textAlign: 'center',
          whiteSpace: 'nowrap' as const,
        }}>
          Built with Claude · Powered by Supabase
        </div>

        {/* Right: links */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 24,
          flexWrap: 'wrap' as const,
        }}>
          {([
            { label: 'About', href: '/about', external: false },
            { label: 'Privacy', href: '/privacy', external: false },
            { label: 'Log in', href: `${APP_URL}/login`, external: false },
            { label: 'Sign up', href: `${APP_URL}/signup`, external: false },
          ] as { label: string; href: string; external: boolean }[]).map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 14,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          footer > div > div:first-child {
            text-align: center;
          }
          footer > div > div:last-child {
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
