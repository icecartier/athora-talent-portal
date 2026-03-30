import { useState } from 'react'
import { Clipboard, Zap, TrendingUp, Star } from 'lucide-react'
import { contentSuggestions, hookFormulas, insight } from '../data/mockCreator'

const PERF_CONFIG = {
  'Very High': { color: '#059669', bg: '#D1FAE5', bar: 100 },
  'High':      { color: '#7C3AED', bg: '#EDE9FB', bar: 78 },
  'Medium':    { color: '#F59E0B', bg: '#FEF3C7', bar: 55 },
  'Low':       { color: '#888',    bg: '#F3F4F6', bar: 30 },
}

const FORMAT_COLOR = {
  'POV Video':           '#7C3AED',
  'Educational':         '#059669',
  'Transformation':      '#F59E0B',
  'Behind the Scenes':   '#6B7280',
  'Talking Head':        '#6B7280',
}

const CORE_REASON = {
  1: 'Based on your last 4 POV videos averaging 11.3k views — your best format by far.',
  2: 'Educational carousels drive 3.2× more profile visits than Reels for your account.',
  3: 'Transformation content gets 40% of its reach from shares — strong discovery potential.',
  4: 'Authenticity content drives DMs and saves — builds trust signals brands look for.',
  5: 'Nostalgia + advice hooks resonate with your 18–34 male audience based on comment patterns.',
}

export default function ContentEngine() {
  const [tab, setTab] = useState('ideas')
  const [copied, setCopied] = useState(null)

  function handleCopy(id, text) {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ── CORE attribution hero ── */}
      <div className="dark-hero-card" style={{ background: '#111111', borderRadius: 16, padding: '22px 28px',
        border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7C3AED', display: 'inline-block',
            animation: 'core-pulse 2s ease-in-out infinite', flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            CORE Engine
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 4 }}>Content built from your data</span>
        </div>
        <p style={{ fontSize: 18, fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: 8 }}>
          {insight.headline}
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
          {insight.detail}
        </p>
        <div className="ce-core-stats" style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          {[
            { label: 'POV avg views', value: '11.3k', accent: true },
            { label: 'Other avg views', value: '5.4k', accent: false },
            { label: 'Difference', value: '2.1×', accent: true },
          ].map(s => (
            <div key={s.label} style={{
              background: s.accent ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${s.accent ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 10, padding: '10px 16px'
            }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: s.accent ? '#A78BFA' : 'white', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4,
        background: 'white', border: '1px solid #DDD9CF', borderRadius: 999, padding: 4, width: 'fit-content' }}>
        {[{ id: 'ideas', label: 'Content Ideas' }, { id: 'hooks', label: 'Hook Library' }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '7px 20px', fontSize: 12, fontWeight: 600, borderRadius: 999,
              background: tab === t.id ? '#111' : 'transparent',
              color: tab === t.id ? 'white' : '#888',
              border: 'none', cursor: 'pointer', transition: 'all 0.15s'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Ideas ── */}
      {tab === 'ideas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {contentSuggestions.map((s, i) => {
            const perf = PERF_CONFIG[s.estimatedPerformance] || PERF_CONFIG['Medium']
            const fmtColor = FORMAT_COLOR[s.format] || '#888'
            return (
              <div key={s.id} className="ce-idea-card" style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14,
                padding: '18px 20px', display: 'grid', gridTemplateColumns: '1fr 160px 180px', gap: 16, alignItems: 'start' }}>

                {/* Title + meta */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: fmtColor,
                      background: `${fmtColor}18`, padding: '2px 9px', borderRadius: 999 }}>{s.format}</span>
                    <span style={{ fontSize: 10, color: '#AAA' }}>{s.platform}</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#111', lineHeight: 1.4, marginBottom: 6 }}>{s.title}</p>
                  <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>{s.why}</p>
                </div>

                {/* Performance meter */}
                <div style={{ background: '#FAFAF8', border: '1px solid #EDE9E2', borderRadius: 10, padding: '12px 14px' }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#AAA', textTransform: 'uppercase',
                    letterSpacing: '0.08em', marginBottom: 8 }}>Est. Performance</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: perf.color, marginBottom: 8, lineHeight: 1 }}>
                    {s.estimatedPerformance}
                  </p>
                  <div style={{ height: 5, background: '#EDE9E2', borderRadius: 999, overflow: 'hidden', marginBottom: 8 }}>
                    <div style={{ width: `${perf.bar}%`, height: '100%', background: perf.color, borderRadius: 999 }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600,
                    color: s.difficulty === 'Easy' ? '#059669' : s.difficulty === 'Medium' ? '#F59E0B' : '#DC2626',
                    background: s.difficulty === 'Easy' ? '#D1FAE5' : s.difficulty === 'Medium' ? '#FEF3C7' : '#FEE2E2',
                    padding: '2px 8px', borderRadius: 999 }}>
                    {s.difficulty} to make
                  </span>
                </div>

                {/* CORE reason */}
                <div style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.12)',
                  borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 7 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C3AED', display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Why CORE picked this</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#555', lineHeight: 1.6 }}>{CORE_REASON[s.id]}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Hook Library ── */}
      {tab === 'hooks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* CORE tip */}
          <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)',
            borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <TrendingUp size={15} color="#7C3AED" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED', marginBottom: 3 }}>Your best hooks follow the POV format</p>
              <p style={{ fontSize: 11, color: '#666', lineHeight: 1.6 }}>
                POV hooks averaged 11.3k views. Use the formula below as your primary template — it's working.
              </p>
            </div>
          </div>

          {hookFormulas.map(h => (
            <div key={h.id} style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED',
                      background: '#EDE9FB', padding: '2px 9px', borderRadius: 999 }}>{h.tag}</span>
                    {h.id === 1 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4,
                        background: '#FEF3C7', padding: '2px 8px', borderRadius: 999 }}>
                        <Star size={9} color="#F59E0B" fill="#F59E0B" />
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#D97706' }}>Your top performer</span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 600, color: '#111',
                    lineHeight: 1.5, marginBottom: 8 }}>{h.formula}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>e.g.</span>
                    <p style={{ fontSize: 12, color: '#888', fontStyle: 'italic' }}>{h.example}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(h.id, h.formula)}
                  style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
                    border: copied === h.id ? '1px solid #059669' : '1px solid #DDD9CF',
                    background: copied === h.id ? '#D1FAE5' : 'white',
                    color: copied === h.id ? '#059669' : '#666',
                    borderRadius: 999, padding: '7px 14px', fontSize: 11, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.15s'
                  }}
                >
                  <Clipboard size={11} />
                  {copied === h.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
