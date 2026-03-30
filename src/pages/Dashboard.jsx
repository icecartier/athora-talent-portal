import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { ChevronLeft, ChevronRight, Check, Plus } from 'lucide-react'
import {
  creator, growth, todaysTasks, dailyViewHistory,
  growthPlan, profile, insight,
} from '../data/mockCreator'
import ProgressBar from '../components/ui/ProgressBar'

// ── Derived constants ──────────────────────────────────────────────────────
const todayDateStr   = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
const completedTasks = todaysTasks.filter(t => t.done).length
const followersNeeded = 15000 - growth.followers                     // 2600
const weeksToUnlock   = Math.ceil(followersNeeded / growth.followerChange7d) // ~8
const unlockDate = (() => {
  const d = new Date()
  d.setDate(d.getDate() + weeksToUnlock * 7)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})()

// ── Schedule data ──────────────────────────────────────────────────────────
const SCHEDULE_MAP = {}
growthPlan.weeklySchedule.forEach(d => { SCHEDULE_MAP[d.day] = d })
const DAYS     = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const DAY_ABBR = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const PRIORITY_COLOR = { high: '#7C3AED', medium: '#059669', low: '#F59E0B', none: '#CCCCCC' }
const PRIORITY_BG    = { high: '#EDE9FB', medium: '#D1FAE5', low: '#FEF3C7', none: '#F5F5F3' }
const TYPE_LABEL     = { Reel: '▶ Reel', Carousel: '▤ Carousel', Story: '◎ Story', Task: '✓ Task' }

// ── Sub-components ─────────────────────────────────────────────────────────

const IMPORTANCE_COLOR = { 3: '#7C3AED', 2: '#059669', 1: '#F59E0B', 0: '#CCCCCC' }
const IMPORTANCE_BG    = { 3: '#EDE9FB', 2: '#D1FAE5', 1: '#FEF3C7', 0: '#F5F5F3' }

function ImportanceDots({ level = 1, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {[1, 2, 3].map(d => (
        <div key={d} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: d <= level ? color : 'rgba(0,0,0,0.1)',
          flexShrink: 0,
        }} />
      ))}
    </div>
  )
}

function EntryPill({ entry }) {
  const imp   = entry.importance ?? 1
  const color = IMPORTANCE_COLOR[imp]
  const bg    = IMPORTANCE_BG[imp]
  return (
    <div style={{ background: bg, borderLeft: `3px solid ${color}`, borderRadius: '0 8px 8px 0', padding: '8px 10px', marginBottom: 7 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {TYPE_LABEL[entry.type] || entry.type}
        </p>
        <ImportanceDots level={imp} color={color} />
      </div>
      <p style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.4, fontWeight: 600 }}>{entry.title}</p>
    </div>
  )
}

function ViewTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 8, padding: '7px 11px', fontSize: 11, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <p style={{ color: '#888', marginBottom: 3 }}>{label}</p>
      <p style={{ fontWeight: 700, color: '#111' }}>{payload[0].value.toLocaleString()} views</p>
    </div>
  )
}

// SVG ring for Brand Ready arc
function ReadinessArc({ pct }) {
  const r = 42, sw = 8, size = 100
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size}>
      <circle cx={50} cy={50} r={r} fill="none" stroke="#EDE9DB" strokeWidth={sw} />
      <circle cx={50} cy={50} r={r} fill="none" stroke="#7C3AED" strokeWidth={sw}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 50 50)" />
      <text x={50} y={50} textAnchor="middle" dy="0.35em"
        style={{ fontSize: 20, fontWeight: 800, fill: '#111', fontFamily: 'Plus Jakarta Sans' }}>
        {pct}%
      </text>
    </svg>
  )
}

// ── CORE Insight Hero ──────────────────────────────────────────────────────
function CoreInsightHero() {
  return (
    <div style={{
      background: '#111111',
      borderRadius: 16,
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    }}>
      {/* Left — label + headline + detail + CTA */}
      <div style={{ flex: 1 }}>
        {/* CORE badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#7C3AED', display: 'inline-block',
            animation: 'core-pulse 2s ease-in-out infinite', flexShrink: 0,
          }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            CORE Intelligence
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 6 }}>· Updated 2h ago</span>
        </div>

        {/* Headline */}
        <p style={{ fontSize: 21, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, marginBottom: 9, letterSpacing: '-0.02em' }}>
          {insight.headline}
        </p>

        {/* Detail */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 18, maxWidth: 520 }}>
          {insight.detail}
        </p>

        {/* Today's action CTA */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9,
          background: '#7C3AED', borderRadius: 999, padding: '8px 18px', cursor: 'pointer' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>
            Today's action — Post your POV hook reel
          </span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>→</span>
        </div>
      </div>

      {/* Right — format comparison metric */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: '18px 24px',
        flexShrink: 0,
        minWidth: 210,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
          Format comparison
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 14, marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 32, fontWeight: 800, color: '#A78BFA', lineHeight: 1, letterSpacing: '-0.02em' }}>11.3k</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>POV avg</p>
          </div>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.18)', paddingBottom: 6 }}>vs</p>
          <div>
            <p style={{ fontSize: 32, fontWeight: 800, color: 'rgba(255,255,255,0.28)', lineHeight: 1, letterSpacing: '-0.02em' }}>5.4k</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>other avg</p>
          </div>
        </div>
        <div style={{ background: 'rgba(124,58,237,0.25)', borderRadius: 999, padding: '4px 12px', display: 'inline-block' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#A78BFA' }}>2.1× outperformance</span>
        </div>
      </div>
    </div>
  )
}

// ── Weekly Calendar — today dominant ───────────────────────────────────────
function WeeklyCalendar() {
  const [weekOffset, setWeekOffset]   = useState(0)
  const [selectedDay, setSelectedDay] = useState(null)

  const getMonday = (offset) => {
    const d = new Date()
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) + offset * 7
    d.setDate(diff); d.setHours(0, 0, 0, 0)
    return d
  }

  const monday    = getMonday(weekOffset)
  const weekDates = DAYS.map((_, i) => { const d = new Date(monday); d.setDate(monday.getDate() + i); return d })
  const todayDate = new Date(); todayDate.setHours(0, 0, 0, 0)
  const monthLabel = monday.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Schedule</p>
          <span style={{ fontSize: 11, color: '#888' }}>{monthLabel}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button onClick={() => { setWeekOffset(w => w - 1); setSelectedDay(null) }}
            style={{ width: 26, height: 26, borderRadius: 7, border: '1px solid #DDD9CF', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronLeft size={13} color="#888" />
          </button>
          <button onClick={() => { setWeekOffset(0); setSelectedDay(null) }}
            style={{ fontSize: 10, fontWeight: 600, color: weekOffset === 0 ? '#7C3AED' : '#888',
              padding: '3px 10px', borderRadius: 5,
              background: weekOffset === 0 ? '#EDE9FB' : '#fff',
              border: `1px solid ${weekOffset === 0 ? '#C4B5FD' : '#DDD9CF'}`,
              cursor: 'pointer' }}>
            Today
          </button>
          <button onClick={() => { setWeekOffset(w => w + 1); setSelectedDay(null) }}
            style={{ width: 26, height: 26, borderRadius: 7, border: '1px solid #DDD9CF', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronRight size={13} color="#888" />
          </button>
        </div>
      </div>

      {/* Day columns — today gets 3× flex */}
      <div style={{ display: 'flex', gap: 8, flex: 1 }}>
        {DAYS.map((day, i) => {
          const date      = weekDates[i]
          const isToday   = date.getTime() === todayDate.getTime()
          const isSelected = selectedDay === i
          const sched     = SCHEDULE_MAP[day]
          const entries   = sched?.entries || []
          const hasDot    = entries.length > 0
          const dotColor  = PRIORITY_COLOR[sched?.priority || 'none']

          return (
            <div key={day}
              onClick={() => setSelectedDay(isSelected ? null : i)}
              style={{
                flexGrow: isToday ? 3 : 1,
                flexBasis: 0,
                background: isToday
                  ? 'linear-gradient(160deg, rgba(124,58,237,0.07) 0%, #fff 55%)'
                  : isSelected ? '#FAFAF8' : '#fff',
                border: isSelected
                  ? '2px solid #7C3AED'
                  : isToday ? '1.5px solid rgba(124,58,237,0.3)' : '1.5px solid #DDD9CF',
                borderRadius: 12,
                padding: isToday ? '14px 12px 10px' : '12px 8px 10px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: isToday ? '0 2px 12px rgba(124,58,237,0.1)' : '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 260,
                overflow: 'hidden',
              }}>

              {/* Day header */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: isToday ? 12 : 8 }}>
                {isToday && (
                  <span style={{ fontSize: 8, fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase',
                    letterSpacing: '0.14em', background: '#EDE9FB', borderRadius: 999,
                    padding: '1px 7px', marginBottom: 6 }}>
                    Today
                  </span>
                )}
                <p style={{ fontSize: 9, fontWeight: 700,
                  color: isToday ? '#7C3AED' : '#AAA',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: isToday ? 4 : 5 }}>
                  {DAY_ABBR[i]}
                </p>
                <div style={{
                  width: isToday ? 38 : 30, height: isToday ? 38 : 30, borderRadius: '50%',
                  background: isToday ? '#7C3AED' : isSelected ? '#EDE9FB' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: isToday ? 18 : 14, fontWeight: 800,
                    color: isToday ? '#fff' : isSelected ? '#7C3AED' : '#1A1A1A', lineHeight: 1 }}>
                    {date.getDate()}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: isToday ? 'rgba(124,58,237,0.15)' : '#EDE9E2', marginBottom: isToday ? 12 : 8 }} />

              {/* Content — full entries for today, dot for others */}
              <div style={{ flex: 1 }}>
                {isToday ? (
                  entries.length > 0
                    ? entries.map((entry, ei) => <EntryPill key={ei} entry={entry} />)
                    : (
                      <div style={{ border: '1.5px dashed #E8E4DC', borderRadius: 8, height: 50,
                        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 11, color: '#CCC' }}>Rest day</span>
                      </div>
                    )
                ) : (
                  /* compact other days */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 2 }}>
                    {entries.length === 0 ? (
                      <p style={{ fontSize: 10, color: '#CCC', textAlign: 'center' }}>Rest</p>
                    ) : (
                      entries.slice(0, 3).map((entry, ei) => {
                        const imp   = entry.importance ?? 1
                        const eColor = IMPORTANCE_COLOR[imp]
                        const eBg    = IMPORTANCE_BG[imp]
                        return (
                          <div key={ei} style={{ background: eBg, borderLeft: `2px solid ${eColor}`,
                            borderRadius: '0 5px 5px 0', padding: '4px 6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                              <p style={{ fontSize: 9, fontWeight: 700, color: eColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                {TYPE_LABEL[entry.type] || entry.type}
                              </p>
                              <ImportanceDots level={imp} color={eColor} />
                            </div>
                            <p style={{ fontSize: 11, color: '#1A1A1A', fontWeight: 600, lineHeight: 1.3,
                              overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical' }}>
                              {entry.title}
                            </p>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>

              {/* Add button — only show on today or selected */}
              {(isToday || isSelected) && (
                <button onClick={e => e.stopPropagation()}
                  style={{ marginTop: 8, width: '100%', border: '1.5px dashed #DDD9CF',
                    borderRadius: 7, padding: '5px 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    background: 'transparent', cursor: 'pointer' }}>
                  <Plus size={10} color="#AAA" />
                  <span style={{ fontSize: 10, color: '#AAA', fontWeight: 600 }}>Add</span>
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Dashboard ──────────────────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* ── 1. Heading row ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
        {/* Creator identity */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>{creator.avatarInitials}</span>
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#888', lineHeight: 1 }}>{creator.niche} Creator · {creator.handle}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                <span style={{ background: '#1A1A1A', color: 'white', borderRadius: 999,
                  padding: '2px 9px', fontSize: 10, fontWeight: 700 }}>
                  {creator.tier} Tier
                </span>
                <span style={{ fontSize: 10, color: '#7C3AED', fontWeight: 600 }}>Lvl 2 · 2,600 to Lvl 3</span>
              </div>
            </div>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Welcome back, {creator.name}.
          </h1>
          <p style={{ fontSize: 11, color: '#999', marginTop: 3 }}>{todayDateStr}</p>
        </div>

        {/* Trajectory stats */}
        <div style={{ display: 'flex', alignItems: 'stretch', background: '#fff',
          border: '1px solid #DDD9CF', borderRadius: 14, overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)', flexShrink: 0 }}>
          {[
            { label: 'Followers',  value: growth.followers.toLocaleString(),      change: '+340 this week',     trajectory: 'Accelerating', tColor: '#059669' },
            { label: 'Avg Views',  value: growth.avgViews.toLocaleString(),        change: '+38% vs last period', trajectory: 'Trending up',   tColor: '#059669' },
            { label: 'Engagement', value: `${growth.avgEngagementRate}%`,          change: '+0.9% vs last mo',   trajectory: 'Above avg',     tColor: '#059669' },
          ].map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'stretch' }}>
              {i > 0 && <div style={{ width: 1, background: '#DDD9CF', flexShrink: 0 }} />}
              <div style={{ padding: '14px 26px', textAlign: 'center' }}>
                <p style={{ fontSize: 34, fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</p>
                <p style={{ fontSize: 11, color: '#999', marginTop: 3, fontWeight: 500 }}>{s.label}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 5 }}>
                  <span style={{ background: '#D1FAE5', color: s.tColor, borderRadius: 999,
                    padding: '1px 7px', fontSize: 9, fontWeight: 700 }}>
                    {s.trajectory}
                  </span>
                </div>
                <p style={{ fontSize: 10, color: '#AAA', marginTop: 3 }}>{s.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. CORE Insight Hero ── */}
      <CoreInsightHero />

      {/* ── 3. Middle row: Brand Ready + View Growth + Engagement ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.6fr 1.4fr', gap: 10 }}>

        {/* Brand Ready — second hero */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Brand Ready</p>
              <p style={{ fontSize: 13, color: '#666' }}>MATCH readiness score</p>
            </div>
            {/* Unlock countdown */}
            <div style={{ background: '#EDE9FB', border: '1px solid #C4B5FD', borderRadius: 10, padding: '8px 14px', textAlign: 'right' }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: '#7C3AED', lineHeight: 1 }}>~{weeksToUnlock} wks</p>
              <p style={{ fontSize: 9, color: '#9060D4', marginTop: 2, fontWeight: 600 }}>Est. {unlockDate}</p>
            </div>
          </div>

          {/* Arc + sub-scores */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ReadinessArc pct={profile.matchReadiness} />
            <div style={{ flex: 1 }}>
              {[
                { label: 'Posts',      pct: Math.round((growth.postsThisMonth / 20) * 100), color: '#7C3AED' },
                { label: 'Engagement', pct: Math.round((growth.avgEngagementRate / 10) * 100), color: '#059669' },
                { label: 'Followers',  pct: Math.round((growth.followers / 15000) * 100), color: '#F59E0B' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: '#666' }}>{item.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{item.pct}%</span>
                  </div>
                  <ProgressBar value={item.pct} max={100} color={item.color} height={6} />
                </div>
              ))}
            </div>
          </div>

          {/* Footer — what moves the score */}
          <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #EDE9E2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 11, color: '#888' }}>
              <span style={{ fontWeight: 700, color: '#111' }}>{followersNeeded.toLocaleString()}</span> followers to unlock Opportunities
            </p>
            <span style={{ background: '#EDE9FB', color: '#7C3AED', borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>
              at {growth.followerChange7d}/wk
            </span>
          </div>
        </div>

        {/* View Growth */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 18, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>View Growth</p>
              <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Daily — last 14 days</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {Math.max(...dailyViewHistory.map(d => d.views)).toLocaleString()}
              </p>
              <p style={{ fontSize: 9, color: '#888', marginTop: 2 }}>peak in a day</p>
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height={130}>
              <LineChart data={dailyViewHistory} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <CartesianGrid stroke="#F5F3EF" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#BBB' }} interval={1} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#BBB' }} />
                <Tooltip content={<ViewTooltip />} />
                <Line type="monotone" dataKey="views" stroke="#7C3AED" strokeWidth={2.5}
                  dot={{ r: 2.5, fill: '#7C3AED', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#7C3AED', strokeWidth: 2, stroke: '#EDE9FB' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: 16, paddingTop: 10, borderTop: '1px solid #EDE9E2', marginTop: 6 }}>
            {[
              { label: 'Avg/day', value: Math.round(dailyViewHistory.reduce((s, d) => s + d.views, 0) / dailyViewHistory.length).toLocaleString() },
              { label: 'Total (14d)', value: dailyViewHistory.reduce((s, d) => s + d.views, 0).toLocaleString() },
              { label: 'Best day', value: 'Mar 28' },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{s.value}</p>
                <p style={{ fontSize: 10, color: '#999' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 18, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 12 }}>Engagement</p>
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 38, fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.03em' }}>{growth.avgEngagementRate}%</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}>
              <p style={{ fontSize: 10, color: '#888' }}>avg rate</p>
              <span style={{ background: '#D1FAE5', color: '#059669', borderRadius: 999,
                padding: '1px 7px', fontSize: 9, fontWeight: 700 }}>↑ +0.9% mo/mo</span>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Likes',          pct: 68 },
              { label: 'Comments',       pct: 18 },
              { label: 'Shares/Saves',   pct: 14 },
            ].map(row => (
              <div key={row.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: '#666' }}>{row.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{row.pct}%</span>
                </div>
                <div style={{ height: 6, background: '#EDE9DB', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${row.pct}%`, height: '100%', background: '#7C3AED', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 10, borderTop: '1px solid #EDE9E2', marginTop: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>12,399</p>
            <p style={{ fontSize: 10, color: '#999' }}>total interactions</p>
          </div>
        </div>
      </div>

      {/* ── 4. Bottom row: Tasks + Calendar ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: 10 }}>

        {/* Tasks */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Tasks</p>
            <span style={{ fontSize: 10, color: '#888', background: '#F0EDE6', borderRadius: 999,
              padding: '3px 9px', fontWeight: 600 }}>
              {completedTasks}/{todaysTasks.length} done
            </span>
          </div>
          <div>
            {todaysTasks.map(t => {
              const imp      = t.importance ?? 1
              const impColor = IMPORTANCE_COLOR[imp]
              return (
                <div key={t.id} style={{ padding: '11px 0', borderBottom: '1px solid #F0EDE6' }}
                  className="last:border-0">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                      border: t.done ? 'none' : '1.5px solid #DDD9CF',
                      background: t.done ? '#7C3AED' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {t.done && <Check size={11} color="white" strokeWidth={3} />}
                    </div>
                    <span style={{ flex: 1, fontSize: 13, color: t.done ? '#AAA' : '#111',
                      textDecoration: t.done ? 'line-through' : 'none', lineHeight: 1.45, fontWeight: t.done ? 400 : 500 }}>
                      {t.task}
                    </span>
                  </div>
                  {/* Importance rating row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5, paddingLeft: 28 }}>
                    <ImportanceDots level={imp} color={impColor} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: impColor }}>
                      {imp === 3 ? 'High priority' : imp === 2 ? 'Medium priority' : 'Low priority'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Calendar — today dominant */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 18 }}>
          <WeeklyCalendar />
        </div>
      </div>
    </div>
  )
}
