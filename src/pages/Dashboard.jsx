import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { ChevronLeft, ChevronRight, Check, Plus } from 'lucide-react'
import { creator, growth, todaysTasks, dailyViewHistory, growthPlan, profile } from '../data/mockCreator'
import ProgressBar from '../components/ui/ProgressBar'

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
const completedTasks = todaysTasks.filter(t => t.done).length

function ArrowBtn() {
  return (
    <div style={{ width: 22, height: 22, borderRadius: 6, background: '#F0EDE6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </div>
  )
}

const SCHEDULE_MAP = {}
growthPlan.weeklySchedule.forEach(d => { SCHEDULE_MAP[d.day] = d })
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const PRIORITY_COLOR = { high: '#7C3AED', medium: '#059669', low: '#F59E0B', none: '#CCCCCC' }
const PRIORITY_BG   = { high: '#EDE9FB', medium: '#D1FAE5', low: '#FEF3C7', none: '#F5F5F3' }
const TYPE_LABEL    = { Reel: '▶ Reel', Carousel: '▤ Carousel', Story: '◎ Story', Task: '✓ Task' }

function EntryPill({ entry }) {
  const color = PRIORITY_COLOR[entry.priority]
  const bg    = PRIORITY_BG[entry.priority]
  return (
    <div style={{
      background: bg,
      borderLeft: `3px solid ${color}`,
      borderRadius: '0 7px 7px 0',
      padding: '6px 9px',
      marginBottom: 6,
    }}>
      <p style={{ fontSize: 9, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
        {TYPE_LABEL[entry.type] || entry.type}
      </p>
      <p style={{ fontSize: 11, color: '#222', lineHeight: 1.4, fontWeight: 500 }}>
        {entry.title}
      </p>
    </div>
  )
}

function WeeklyCalendar() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState(null)

  const getMonday = (offset) => {
    const d = new Date()
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) + offset * 7
    d.setDate(diff)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const monday = getMonday(weekOffset)
  const weekDates = DAYS.map((_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)

  const monthLabel = monday.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div>
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Schedule</p>
          <span style={{ fontSize: 11, color: '#888' }}>{monthLabel}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setWeekOffset(w => w - 1); setSelectedDay(null) }}
            className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-surface transition-colors border border-cream-deep">
            <ChevronLeft size={13} color="#888" />
          </button>
          <button
            onClick={() => { setWeekOffset(0); setSelectedDay(null) }}
            style={{
              fontSize: 10, fontWeight: 600,
              color: weekOffset === 0 ? '#7C3AED' : '#888',
              padding: '2px 10px', borderRadius: 5,
              background: weekOffset === 0 ? '#EDE9FB' : '#fff',
              border: `1px solid ${weekOffset === 0 ? '#C4B5FD' : '#DDD9CF'}`,
            }}>
            Today
          </button>
          <button
            onClick={() => { setWeekOffset(w => w + 1); setSelectedDay(null) }}
            className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-surface transition-colors border border-cream-deep">
            <ChevronRight size={13} color="#888" />
          </button>
        </div>
      </div>

      {/* 7 day cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
        {DAYS.map((day, i) => {
          const date = weekDates[i]
          const isToday = date.getTime() === todayDate.getTime()
          const isSelected = selectedDay === i
          const sched = SCHEDULE_MAP[day]
          const entries = sched?.entries || []

          return (
            <div
              key={day}
              onClick={() => setSelectedDay(isSelected ? null : i)}
              style={{
                background: isToday
                  ? 'linear-gradient(160deg, rgba(124,58,237,0.06) 0%, #fff 60%)'
                  : '#fff',
                border: isSelected
                  ? '2px solid #7C3AED'
                  : isToday
                  ? '1.5px solid rgba(124,58,237,0.3)'
                  : '1.5px solid #DDD9CF',
                borderRadius: 12,
                padding: '12px 10px 10px',
                minHeight: 270,
                cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s',
                boxShadow: isSelected
                  ? '0 0 0 3px rgba(124,58,237,0.12)'
                  : isToday
                  ? '0 2px 8px rgba(124,58,237,0.08)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Day header */}
              <div className="flex flex-col items-center mb-3">
                <p style={{
                  fontSize: 9, fontWeight: 700,
                  color: isToday ? '#7C3AED' : '#AAAAAA',
                  textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5,
                }}>
                  {DAY_ABBR[i]}
                </p>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: isToday ? '#7C3AED' : isSelected ? '#EDE9FB' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontSize: 18, fontWeight: 800,
                    color: isToday ? '#fff' : isSelected ? '#7C3AED' : '#1A1A1A',
                    lineHeight: 1,
                  }}>
                    {date.getDate()}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: isToday ? 'rgba(124,58,237,0.15)' : '#EDE9E2', marginBottom: 10 }} />

              {/* Entries */}
              <div style={{ flex: 1 }}>
                {entries.length > 0 ? (
                  entries.map((entry, ei) => (
                    <EntryPill key={ei} entry={entry} />
                  ))
                ) : (
                  <div style={{
                    height: '100%', minHeight: 60,
                    border: '1.5px dashed #E8E4DC',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 11, color: '#CCC', fontWeight: 500 }}>Rest day</span>
                  </div>
                )}
              </div>

              {/* Add button */}
              <button
                onClick={e => e.stopPropagation()}
                style={{
                  marginTop: 8, width: '100%',
                  border: '1.5px dashed #DDD9CF',
                  borderRadius: 7, padding: '5px 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                  background: 'transparent', cursor: 'pointer',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                className="hover:border-primary hover:bg-primary-light"
              >
                <Plus size={10} color="#AAA" />
                <span style={{ fontSize: 10, color: '#AAA', fontWeight: 600 }}>Add</span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Custom tooltip for daily line chart
function ViewTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 8, padding: '7px 11px', fontSize: 11, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <p style={{ color: '#888', marginBottom: 3 }}>{label}</p>
      <p style={{ fontWeight: 700, color: '#111' }}>{payload[0].value.toLocaleString()} views</p>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-3.5">

      {/* ── Heading Row ── */}
      <div className="flex items-center justify-between gap-8">
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Welcome back, {creator.name}.
          </h1>
          <p style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
            {today} · {creator.niche} · {creator.handle}
          </p>
        </div>
        <div className="flex items-stretch gap-0 bg-surface border border-cream-border rounded-xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          {[
            { label: 'Followers',  value: growth.followers.toLocaleString(), change: '+340 this week', up: true },
            { label: 'Avg Views',  value: growth.avgViews.toLocaleString(),  change: '+12% vs last week', up: true },
            { label: 'Engagement', value: `${growth.avgEngagementRate}%`,     change: '+0.9% vs last month', up: true },
          ].map((s, i) => (
            <div key={s.label} className="flex items-stretch">
              {i > 0 && <div style={{ width: 1, background: '#DDD9CF', flexShrink: 0 }} />}
              <div style={{ padding: '14px 28px', textAlign: 'center' }}>
                <p style={{ fontSize: 36, fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</p>
                <p style={{ fontSize: 11, color: '#999', marginTop: 3, fontWeight: 500 }}>{s.label}</p>
                <p style={{ fontSize: 10, color: '#059669', marginTop: 3, fontWeight: 600 }}>↑ {s.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress Strip ── */}
      <div className="bg-surface border border-cream-border rounded-xl flex items-stretch" style={{ padding: '12px 0' }}>
        {[
          { label: 'Follower Growth',    pct: Math.round((growth.followers / 15000) * 100), color: '#7C3AED' },
          { label: 'Content Consistency', pct: 78,                                           color: '#059669' },
          { label: 'Engagement Rate',    pct: Math.round((growth.avgEngagementRate / 10) * 100), color: '#F59E0B' },
          { label: 'MATCH Readiness',    pct: profile.matchReadiness,                         color: '#7C3AED' },
        ].map((item, i) => (
          <div key={item.label} className="flex-1 flex items-stretch">
            {i > 0 && <div style={{ width: 1, background: '#DDD9CF', flexShrink: 0 }} />}
            <div className="flex-1 px-4">
              <p style={{ fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>{item.label}</p>
              <ProgressBar value={item.pct} max={100} color={item.color} height={7} />
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginTop: 5 }}>{item.pct}%</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Top Card Grid ── 4 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 200px', gap: 10 }}>

        {/* Profile Card */}
        <div style={{ background: 'linear-gradient(160deg, #EDE9DB 0%, #E0DCCF 100%)', border: '1px solid #DDD9CF', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column' }}>
          <div className="flex flex-col items-center text-center mb-4">
            <div style={{ width: 64, height: 64, borderRadius: 12, background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{creator.avatarInitials}</span>
            </div>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#111', lineHeight: 1.2 }}>{creator.name}</p>
            <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{creator.niche} Creator</p>
            <span style={{ marginTop: 8, background: '#1A1A1A', color: 'white', borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
              {creator.tier} Tier
            </span>
          </div>
          <div className="flex flex-col" style={{ borderTop: '1px solid #D4D0C8' }}>
            {['Content Plan', 'Brand Profile', 'Audience Data', 'Opportunities'].map(link => (
              <div key={link} className="flex items-center justify-between py-2 cursor-pointer hover:opacity-70 transition-opacity" style={{ borderBottom: '1px solid #E8E4DC' }}>
                <span style={{ fontSize: 11, color: '#444' }}>{link}</span>
                <ChevronRight size={12} color="#999" />
              </div>
            ))}
          </div>
        </div>

        {/* View Growth — Daily */}
        <div className="bg-surface border border-cream-deep rounded-xl p-4 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>View Growth</p>
              <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Daily — last 14 days</p>
            </div>
            <ArrowBtn />
          </div>
          {/* Big peak stat */}
          <div className="flex items-end gap-4 mb-3">
            <div>
              <p style={{ fontSize: 40, fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.03em' }}>
                {Math.max(...dailyViewHistory.map(d => d.views)).toLocaleString()}
              </p>
              <p style={{ fontSize: 11, color: '#888', marginTop: 3 }}>peak views in a day</p>
            </div>
            <div style={{ paddingBottom: 4 }}>
              <span style={{ background: '#D1FAE5', color: '#059669', borderRadius: 999, padding: '3px 9px', fontSize: 11, fontWeight: 600 }}>
                ↑ Trending up
              </span>
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={dailyViewHistory} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#F0EDE6" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#BBB' }} interval={1} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#BBB' }} />
                <Tooltip content={<ViewTooltip />} />
                <Line type="monotone" dataKey="views" stroke="#7C3AED" strokeWidth={2.5}
                  dot={{ r: 3, fill: '#7C3AED', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#7C3AED', strokeWidth: 2, stroke: '#EDE9FB' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Mini footer stats */}
          <div className="flex items-center gap-4 mt-2 pt-3" style={{ borderTop: '1px solid #EDE9E2' }}>
            {[
              { label: 'Avg / day', value: Math.round(dailyViewHistory.reduce((s,d) => s + d.views, 0) / dailyViewHistory.length).toLocaleString() },
              { label: 'Total (14d)', value: dailyViewHistory.reduce((s,d) => s + d.views, 0).toLocaleString() },
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
        <div className="bg-surface border border-cream-deep rounded-xl p-4 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Engagement</p>
            <ArrowBtn />
          </div>
          <div className="flex items-end gap-4 mb-4">
            <div>
              <p style={{ fontSize: 40, fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.03em' }}>{growth.avgEngagementRate}%</p>
              <p style={{ fontSize: 11, color: '#888', marginTop: 3 }}>avg engagement rate</p>
            </div>
            <div style={{ paddingBottom: 4 }}>
              <span style={{ background: '#D1FAE5', color: '#059669', borderRadius: 999, padding: '3px 9px', fontSize: 11, fontWeight: 600 }}>
                ↑ +0.9% vs last month
              </span>
            </div>
          </div>
          {/* Breakdown bars */}
          <div className="flex flex-col gap-3 flex-1">
            {[
              { label: 'Likes',          pct: 68, count: '8,432' },
              { label: 'Comments',       pct: 18, count: '2,231' },
              { label: 'Shares / Saves', pct: 14, count: '1,736' },
            ].map(row => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>{row.pct}%</span>
                </div>
                <div style={{ height: 7, background: '#EDE9DB', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${row.pct}%`, height: '100%', background: '#7C3AED', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
          {/* Footer */}
          <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid #EDE9E2' }}>
            {[
              { label: 'Total interactions', value: '12,399' },
              { label: 'Best post',          value: '2.1k eng.' },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{s.value}</p>
                <p style={{ fontSize: 10, color: '#999' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Ready */}
        <div className="bg-surface border border-cream-deep rounded-xl p-4 flex flex-col">
          <div className="flex items-start justify-between mb-1">
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Brand Ready</p>
          </div>
          <p style={{ fontSize: 40, fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 4 }}>{profile.matchReadiness}%</p>
          <p style={{ fontSize: 11, color: '#888', marginBottom: 14 }}>match readiness score</p>
          <div className="flex flex-col gap-3 flex-1">
            {[
              { label: 'Posts',      pct: Math.round((growth.postsThisMonth / 20) * 100), color: '#7C3AED' },
              { label: 'Engagement', pct: Math.round((growth.avgEngagementRate / 10) * 100), color: '#059669' },
              { label: 'Followers',  pct: Math.round((growth.followers / 15000) * 100), color: '#F59E0B' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>{item.pct}%</span>
                </div>
                <ProgressBar value={item.pct} max={100} color={item.color} height={6} />
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid #EDE9E2' }}>
            <span style={{ background: '#EDE9FB', color: '#7C3AED', borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>
              2,600 followers to go
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Tasks + Schedule side by side ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 10 }}>

        {/* Tasks */}
        <div className="bg-surface border border-cream-deep rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Tasks</p>
            <span style={{ fontSize: 11, color: '#888', background: '#F0EDE6', borderRadius: 999, padding: '3px 9px', fontWeight: 600 }}>
              {completedTasks}/{todaysTasks.length} done
            </span>
          </div>
          <div className="flex flex-col">
            {todaysTasks.map(t => {
              const dotColor = { high: '#7C3AED', medium: '#059669', low: '#F59E0B' }[t.priority] || '#CCC'
              return (
                <div key={t.id} className="flex items-start gap-2.5 py-3 border-b border-cream-deep last:border-0">
                  <div style={{ width: 17, height: 17, borderRadius: '50%', border: t.done ? 'none' : '1.5px solid #DDD9CF', background: t.done ? '#7C3AED' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {t.done && <Check size={10} color="white" strokeWidth={3} />}
                  </div>
                  <span style={{ flex: 1, fontSize: 12, color: t.done ? '#AAA' : '#111', textDecoration: t.done ? 'line-through' : 'none', lineHeight: 1.45 }}>{t.task}</span>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor, flexShrink: 0, marginTop: 5 }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Full-width Schedule */}
        <WeeklyCalendar />

      </div>
    </div>
  )
}
