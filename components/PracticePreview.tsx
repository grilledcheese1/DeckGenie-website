'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Difficulty = 'Easy' | 'Medium' | 'Hard'

type Card = {
  chinese: string
  pinyin: string
  chips: string[]
  difficulty: Difficulty
  translation: string
  correct: boolean
  score: number
  feedback: string
  correctAnswer?: string
}

const LEFT_CARDS: Card[] = [
  {
    chinese: '这本书很有意思',
    pinyin: 'Zhè běn shū hěn yǒuyìsi',
    chips: ['书', '有意思'],
    difficulty: 'Easy',
    translation: 'This book is very interesting.',
    correct: true, score: 95,
    feedback: 'Great — you captured the meaning precisely.',
  },
  {
    chinese: '我每天早上喝咖啡',
    pinyin: 'Wǒ měitiān zǎoshang hē kāfēi',
    chips: ['每天', '咖啡'],
    difficulty: 'Easy',
    translation: 'I drink coffee every morning.',
    correct: true, score: 100,
    feedback: 'Perfect translation.',
  },
  {
    chinese: '他不喜欢吃蔬菜',
    pinyin: 'Tā bù xǐhuān chī shūcài',
    chips: ['喜欢', '蔬菜'],
    difficulty: 'Medium',
    translation: "He doesn't like eating vegetables.",
    correct: true, score: 92,
    feedback: '"Eating" and "to eat" are both acceptable here.',
  },
]

const RIGHT_CARDS: Card[] = [
  {
    chinese: '我们明天去图书馆',
    pinyin: 'Wǒmen míngtiān qù túshūguǎn',
    chips: ['明天', '图书馆'],
    difficulty: 'Medium',
    translation: 'We are going to the library tomorrow.',
    correct: false, score: 48,
    feedback: 'Missing the preposition — "to the library" is required.',
    correctAnswer: 'We are going to the library tomorrow.',
  },
  {
    chinese: '她学习中文很努力',
    pinyin: 'Tā xuéxí zhōngwén hěn nǔlì',
    chips: ['学习', '努力'],
    difficulty: 'Hard',
    translation: 'She studies Chinese very hard.',
    correct: true, score: 97,
    feedback: 'Excellent — natural and accurate.',
  },
  {
    chinese: '今天天气怎么样',
    pinyin: 'Jīntiān tiānqì zěnmeyàng',
    chips: ['今天', '天气'],
    difficulty: 'Hard',
    translation: 'How is the weather today?',
    correct: false, score: 55,
    feedback: 'Missing the article; should ask about condition, not identity.',
    correctAnswer: 'How is the weather today?',
  },
]

const DIFF_STYLE: Record<Difficulty, { color: string; bg: string; border: string }> = {
  Easy:   { color: '#6ee7b7', bg: 'rgba(5,150,105,0.12)',  border: 'rgba(5,150,105,0.3)' },
  Medium: { color: '#fcd34d', bg: 'rgba(180,130,0,0.12)',  border: 'rgba(180,130,0,0.3)' },
  Hard:   { color: '#fca5a5', bg: 'rgba(127,29,29,0.2)',   border: 'rgba(153,27,27,0.35)' },
}

export default function PracticePreview() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.fromTo('.flashcard-deck', { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.2, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
    }, sectionRef)
    const t = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => { ctx.revert(); clearTimeout(t) }
  }, [])

  return (
    <section
      id="practice-preview"
      ref={sectionRef}
      style={{
        padding: '96px 32px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ marginBottom: 56, maxWidth: 520 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--accent-text)',
            letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16,
          }}>
            Try it now
          </div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 300,
            lineHeight: 1.15, letterSpacing: '-0.02em',
            color: 'var(--text-primary)', margin: '0 0 16px',
          }}>
            Type a translation.{' '}
            <span className="font-hanzi" style={{ color: 'var(--hanzi-color)' }}>看看结果。</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-tertiary)', lineHeight: 1.65, margin: 0 }}>
            Hover a card to watch it demo itself
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
          <FlashcardDeck cards={LEFT_CARDS} />
          <FlashcardDeck cards={RIGHT_CARDS} />
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #practice-preview > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

function FlashcardDeck({ cards }: { cards: Card[] }) {
  const [index, setIndex]     = useState(0)
  const [phase, setPhase]     = useState<'input' | 'graded' | 'done'>('input')
  const [answer, setAnswer]   = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const cardRef   = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  // Hover refs
  const isHovering    = useRef(false)
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const autoStartRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Always-current pointers so closures never go stale
  const handleNextRef = useRef<() => void>(() => {})
  const runTypewriter = useRef<() => void>(() => {})

  const clearAuto = useCallback(() => {
    if (typewriterRef.current) { clearInterval(typewriterRef.current); typewriterRef.current = null }
    if (autoStartRef.current)  { clearTimeout(autoStartRef.current);  autoStartRef.current = null }
    setIsTyping(false)
  }, [])

  // Animate grade result after phase flips
  useEffect(() => {
    if (phase === 'graded' && resultRef.current) {
      gsap.fromTo(resultRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
      )
    }
  }, [phase])

  const handleNext = useCallback(() => {
    const isLast = index === cards.length - 1
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      y: -55, opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        if (isLast) {
          setPhase('done')
        } else {
          setIndex(i => i + 1)
          setAnswer('')
          setPhase('input')
        }
        gsap.fromTo(cardRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
        )
      },
    })
  }, [index, cards.length])

  useEffect(() => { handleNextRef.current = handleNext }, [handleNext])

  // Define typewriter inline so it always closes over fresh `index`
  // and store in a ref so timeouts can call it after re-renders
  const makeTypewriter = useCallback((cardIndex: number) => () => {
    clearAuto()
    const target = cards[cardIndex].translation
    let i = 0
    setIsTyping(true)
    typewriterRef.current = setInterval(() => {
      i++
      setAnswer(target.slice(0, i))
      if (i >= target.length) {
        clearInterval(typewriterRef.current!)
        typewriterRef.current = null
        setIsTyping(false)
      }
    }, 38)
  }, [cards, clearAuto])

  // Keep runTypewriter ref current for the active index
  useEffect(() => {
    runTypewriter.current = makeTypewriter(index)
  }, [index, makeTypewriter])

  // When index advances while hovering, auto-fill the new card
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    if (isHovering.current) {
      autoStartRef.current = setTimeout(() => {
        if (isHovering.current) runTypewriter.current()
      }, 400)
    }
  }, [index])

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true
    // Only fill if input is empty — don't overwrite something the user typed
    if (phase === 'input' && !answer) runTypewriter.current()
  }, [phase, answer])

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false
    if (autoStartRef.current) { clearTimeout(autoStartRef.current); autoStartRef.current = null }
    // Clear only if the typewriter is still mid-flight (partial answer)
    if (typewriterRef.current) {
      clearAuto()
      setAnswer('')
    }
  }, [clearAuto])

  const handleCheck = useCallback(() => setPhase('graded'), [])

  const handleReset = useCallback(() => {
    clearAuto()
    isHovering.current = false
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      y: -30, opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setIndex(0); setAnswer(''); setPhase('input')
        firstRender.current = true  // prevent auto-start on reset
        gsap.fromTo(cardRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
        )
      },
    })
  }, [clearAuto])

  useEffect(() => clearAuto, [clearAuto])

  const current = cards[index]
  const remaining = cards.length - 1 - index
  const diff = phase !== 'done' ? DIFF_STYLE[current.difficulty] : DIFF_STYLE.Easy

  return (
    <div
      className="flashcard-deck"
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {phase !== 'done' && remaining > 0 && (
        <div style={{
          position: 'absolute', bottom: -10, left: 10, right: 10, height: '100%',
          backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border)',
          borderRadius: 'var(--card-radius)', zIndex: 0,
        }} />
      )}
      {phase !== 'done' && remaining > 1 && (
        <div style={{
          position: 'absolute', bottom: -18, left: 18, right: 18, height: '100%',
          backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--card-radius)', zIndex: -1,
        }} />
      )}

      <div
        ref={cardRef}
        style={{
          position: 'relative', zIndex: 1,
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--card-radius)',
          overflow: 'hidden',
        }}
      >
        {phase === 'done' ? (
          <div style={{ padding: '36px 24px', textAlign: 'center' as const }}>
            <div className="font-hanzi" style={{ fontSize: '2.5rem', color: 'var(--hanzi-color)', marginBottom: 12, lineHeight: 1 }}>
              完成！
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 6 }}>
              All {cards.length} sentences complete.
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 24 }}>
              In the real app, this unlocks new vocabulary.
            </div>
            <button
              onClick={handleReset}
              style={{
                width: '100%', padding: '10px',
                fontSize: 13, fontWeight: 600, color: '#fff',
                backgroundColor: 'var(--accent)',
                border: '1px solid transparent', borderRadius: 10,
                cursor: 'pointer', transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)' }}
            >
              Try again ↺
            </button>
          </div>
        ) : (
          <div style={{ padding: '20px 20px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
                {index + 1} / {cards.length}
              </span>
              <span style={{
                fontSize: 10, fontWeight: 600, color: diff.color,
                backgroundColor: diff.bg, border: `1px solid ${diff.border}`,
                borderRadius: 6, padding: '2px 8px', letterSpacing: '0.04em',
              }}>
                {current.difficulty}
              </span>
            </div>

            <div style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: '0.02em', marginBottom: 8 }}>
              {current.pinyin}
            </div>

            <div className="font-hanzi" style={{
              fontSize: 'clamp(1.5rem, 3vw, 1.85rem)', color: 'var(--text-primary)',
              lineHeight: 1.3, letterSpacing: '0.04em', marginBottom: 14,
            }}>
              {current.chinese}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginBottom: 16 }}>
              {current.chips.map(chip => (
                <span key={chip} className="font-hanzi" style={{
                  fontSize: 12, padding: '3px 10px', borderRadius: 6,
                  backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}>
                  {chip}
                </span>
              ))}
            </div>

            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              disabled={phase === 'graded'}
              placeholder="Hover to demo — or type your own translation…"
              rows={2}
              style={{
                width: '100%', padding: '10px 14px', fontSize: 13,
                color: 'var(--text-primary)', backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)', borderRadius: 10,
                resize: 'none', outline: 'none', fontFamily: 'inherit',
                lineHeight: 1.5, boxSizing: 'border-box' as const, marginBottom: 10,
                opacity: phase === 'graded' ? 0.6 : 1,
                transition: 'opacity 0.2s ease, border-color 0.2s ease',
              }}
              onFocus={e => { if (phase !== 'graded') e.currentTarget.style.borderColor = 'var(--accent)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
            />

            {phase === 'input' ? (
              <button
                onClick={handleCheck}
                disabled={isTyping || !answer.trim()}
                style={{
                  width: '100%', padding: '10px', fontSize: 13, fontWeight: 600, color: '#fff',
                  backgroundColor: (!isTyping && answer.trim()) ? 'var(--accent)' : 'var(--bg-tertiary)',
                  border: '1px solid transparent', borderRadius: 10,
                  cursor: (!isTyping && answer.trim()) ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => { if (!isTyping && answer.trim()) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)' }}
                onMouseLeave={e => { if (!isTyping && answer.trim()) (e.currentTarget as HTMLElement).style.backgroundColor = (!isTyping && answer.trim()) ? 'var(--accent)' : 'var(--bg-tertiary)' }}
              >
                Check answer →
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isTyping}
                style={{
                  width: '100%', padding: '10px', fontSize: 13, fontWeight: 600,
                  color: 'var(--text-primary)', backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)', borderRadius: 10,
                  cursor: isTyping ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease',
                  opacity: isTyping ? 0.5 : 1,
                }}
                onMouseEnter={e => {
                  if (isTyping) return
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-secondary)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--text-tertiary)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-tertiary)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                }}
              >
                {index === cards.length - 1 ? 'Finish deck ✓' : 'Next card →'}
              </button>
            )}

            {phase === 'graded' && (
              <div ref={resultRef} style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {current.correct ? (
                  <div style={{
                    padding: '10px 14px', borderRadius: 10,
                    backgroundColor: 'rgba(5,150,105,0.12)',
                    border: '1px solid rgba(5,150,105,0.4)',
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#059669', marginBottom: 4 }}>
                      ✓ Correct · {current.score}/100
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {current.feedback}
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{
                      padding: '10px 14px', borderRadius: 10,
                      backgroundColor: 'rgba(127,29,29,0.3)',
                      border: '1px solid rgba(153,27,27,0.4)',
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#fca5a5', marginBottom: 4 }}>
                        ✗ Incorrect · {current.score}/100
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {current.feedback}
                      </div>
                    </div>
                    <div style={{
                      padding: '10px 14px', borderRadius: 10,
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                    }}>
                      <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 4, letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
                        Correct answer
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {current.correctAnswer}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
