import { Lock, TrendingUp, Zap, CheckCircle } from 'lucide-react'
import { opportunities, growth } from '../data/mockCreator'
import ProgressBar from '../components/ui/ProgressBar'

const followersNeeded = opportunities.unlockAt - opportunities.currentFollowers
const weeksToUnlock   = Math.ceil(followersNeeded / growth.followerChange7d)
const unlockDate = (() => {
  const d = new Date()
  d.setDate(d.getDate() + weeksToUnlock * 7)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
})()
const pct = Math.round((opportunities.currentFollowers / opportunities.unlockAt) * 100)

const previewBrands = [
  ...opportunities.previewOpportunities,
  { id: 3, brand: 'NovaBurn Labs',  category: 'Supplements',   type: 'Ambassador Deal',   payout: '$1,200–$1,800', requirements: '15k+ followers, fitness niche, 30-day campaign' },
  { id: 4, brand: 'Strongr App',    category: 'Fitness Tech',  type: 'Affiliate + Reel',  payout: '$300 + rev share', requirements: '15k+ followers, workout content, US audience' },
]

const accelerators = [
  { label: 'Follower growth',    value: '+340/wk',  note: 'On track',       color: '#059669', bg: '#D1FAE5' },
  { label: 'Content consistency', value: '78%',     note: '4 posts/wk goal', color: '#F59E0B', bg: '#FEF3C7' },
  { label: 'Engagement rate',    value: '4.7%',     note: 'Above average',  color: '#7C3AED', bg: '#EDE9FB' },
]

export default function Opportunities() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ── Countdown hero ── */}
      <div style={{ background: '#111111', borderRadius: 16, padding: '28px 32px',
        border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>

        {/* MATCH badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7C3AED', display: 'inline-block',
            animation: 'core-pulse 2s ease-in-out infinite', flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            MATCH System
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 4 }}>Brand deal matching</span>
        </div>

        {/* Main countdown */}
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 8, fontWeight: 500 }}>
          You're on track to unlock brand deals in
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <span style={{ fontSize: 80, fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.04em' }}>
              {weeksToUnlock}
            </span>
            <div style={{ paddingBottom: 12 }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.6)', lineHeight: 1 }}>weeks</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>Est. {unlockDate}</p>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
            <div style={{ background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
              <p style={{ fontSize: 26, fontWeight: 800, color: '#A78BFA', lineHeight: 1 }}>+340</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>followers/week</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
              <p style={{ fontSize: 26, fontWeight: 800, color: 'white', lineHeight: 1 }}>{followersNeeded.toLocaleString()}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>to go</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 7, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #7C3AED, #A78BFA)', borderRadius: 999 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{opportunities.currentFollowers.toLocaleString()} followers now</span>
          <span style={{ fontSize: 11, color: '#A78BFA', fontWeight: 600 }}>{pct}% · {opportunities.unlockAt.toLocaleString()} unlocks MATCH</span>
        </div>
      </div>

      {/* ── 2-col: Accelerators + What to do ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        {/* Growth signals */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>What's moving you forward</p>
          <p style={{ fontSize: 11, color: '#888', marginBottom: 16 }}>Your current trajectory at a glance</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {accelerators.map(a => (
              <div key={a.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', background: '#FAFAF8', border: '1px solid #EDE9E2', borderRadius: 10 }}>
                <div>
                  <p style={{ fontSize: 12, color: '#444', fontWeight: 500 }}>{a.label}</p>
                  <p style={{ fontSize: 10, color: '#999', marginTop: 2 }}>{a.note}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 18, fontWeight: 800, color: '#111', lineHeight: 1 }}>{a.value}</p>
                  <span style={{ background: a.bg, color: a.color, borderRadius: 999,
                    padding: '1px 8px', fontSize: 9, fontWeight: 700, marginTop: 3, display: 'inline-block' }}>
                    ✓ On track
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to do */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>How to get there faster</p>
          <p style={{ fontSize: 11, color: '#888', marginBottom: 16 }}>Each of these accelerates your unlock date</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { action: 'Post 4× per week consistently',         impact: '−1 week',    color: '#7C3AED' },
              { action: 'Prioritise POV reels on Mon & Fri',     impact: '−0.5 weeks', color: '#059669' },
              { action: 'Engage with comments in first 30 min',  impact: '+reach',     color: '#F59E0B' },
              { action: 'Keep engagement rate above 4%',         impact: 'MATCH score ↑', color: '#7C3AED' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#EDE9FB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle size={13} color="#7C3AED" />
                </div>
                <p style={{ flex: 1, fontSize: 12, color: '#333', fontWeight: 500 }}>{item.action}</p>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: '#F5F3FF',
                  borderRadius: 999, padding: '2px 8px', flexShrink: 0 }}>
                  {item.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Brand previews ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Waiting for you</p>
            <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>These brands are actively looking for creators like you</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EDE9FB',
            border: '1px solid #C4B5FD', borderRadius: 999, padding: '5px 12px' }}>
            <Lock size={11} color="#7C3AED" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#7C3AED' }}>Unlocks at 15k followers</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {previewBrands.map(opp => (
            <div key={opp.id} style={{ position: 'relative', borderRadius: 14, overflow: 'hidden' }}>
              {/* Blurred card */}
              <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 20,
                filter: 'blur(5px)', opacity: 0.5, pointerEvents: 'none', userSelect: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 4 }}>{opp.brand}</p>
                    <span style={{ background: '#EDE9FB', color: '#7C3AED', borderRadius: 999,
                      padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>{opp.category}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 22, fontWeight: 800, color: '#059669', lineHeight: 1 }}>{opp.payout}</p>
                    <p style={{ fontSize: 10, color: '#888', marginTop: 2 }}>estimated payout</p>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>{opp.type}</p>
                <p style={{ fontSize: 11, color: '#AAA' }}>{opp.requirements}</p>
              </div>
              {/* Lock overlay */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(124,58,237,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={16} color="#7C3AED" />
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#7C3AED' }}>Unlocks at 15k</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
