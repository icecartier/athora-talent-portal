import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, Zap } from 'lucide-react'
import { recentPosts, dailyViewHistory, contentBreakdown, performanceInsights, growth } from '../data/mockCreator'
import { tooltipStyle } from '../lib/chartStyles'

const TREND_CONFIG = {
  up:   { icon: TrendingUp,   color: '#059669', bg: '#D1FAE5', label: '↑ Trending up' },
  down: { icon: TrendingDown, color: '#DC2626', bg: '#FEE2E2', label: '↓ Below avg'   },
  flat: { icon: Minus,        color: '#888888', bg: '#F3F4F6', label: '→ Flat'         },
}

export default function Performance() {
  const peakDay = dailyViewHistory.reduce((a, b) => b.views > a.views ? b : a)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ── CORE Insights hero ── */}
      <div className="dark-hero-card" style={{ background: '#111111', borderRadius: 16, padding: '24px 28px',
        border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>

        {/* badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7C3AED', display: 'inline-block',
            animation: 'core-pulse 2s ease-in-out infinite', flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            CORE Analysis
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 4 }}>What the data is saying right now</span>
        </div>

        <div className="perf-insights-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {performanceInsights.map(ins => (
            <div key={ins.id} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: ins.type === 'pattern' ? '#A78BFA' : ins.type === 'timing' ? '#FCD34D' : '#6EE7B7',
                  background: ins.type === 'pattern' ? 'rgba(124,58,237,0.2)' : ins.type === 'timing' ? 'rgba(245,158,11,0.2)' : 'rgba(5,150,105,0.2)',
                  padding: '2px 8px', borderRadius: 999 }}>
                  {ins.type}
                </span>
                <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: ins.impact === 'High' ? '#6EE7B7' : '#FCD34D',
                  color: ins.impact === 'High' ? '#6EE7B7' : '#FCD34D' }}>
                  {ins.impact} impact
                </span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.4, marginBottom: 6 }}>{ins.headline}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 10 }}>{ins.detail}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <ArrowUpRight size={11} color="#A78BFA" />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#A78BFA' }}>{ins.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Posts ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Recent Posts</p>
          <p style={{ fontSize: 11, color: '#888' }}>Last 5 posts with CORE analysis</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recentPosts.map(post => {
            const trend = TREND_CONFIG[post.trend] || TREND_CONFIG.flat
            const TrendIcon = trend.icon
            return (
              <div key={post.id} className="recent-post-grid" style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: '16px 20px',
                display: 'grid', gridTemplateColumns: '1fr 80px 80px 200px', gap: 16, alignItems: 'center' }}>

                {/* Title + meta */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', background: '#EDE9FB',
                      padding: '2px 8px', borderRadius: 999 }}>{post.format}</span>
                    <span style={{ fontSize: 10, color: '#AAA' }}>{post.type}</span>
                    <span style={{ fontSize: 10, color: '#CCC' }}>·</span>
                    <span style={{ fontSize: 10, color: '#AAA' }}>{post.date}</span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111', lineHeight: 1.4 }}>{post.title}</p>
                </div>

                {/* Views */}
                <div>
                  <p style={{ fontSize: 10, color: '#AAA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>Views</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: '#111', lineHeight: 1 }}>{post.views.toLocaleString()}</p>
                </div>

                {/* Engagement */}
                <div>
                  <p style={{ fontSize: 10, color: '#AAA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>Eng.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <p style={{ fontSize: 18, fontWeight: 800, color: '#111', lineHeight: 1 }}>{post.engagement}%</p>
                    <TrendIcon size={13} color={trend.color} strokeWidth={2.5} />
                  </div>
                </div>

                {/* CORE note */}
                <div className="recent-post-core-col" style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.12)',
                  borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C3AED', display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CORE note</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#555', lineHeight: 1.5 }}>{post.coreNote}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 2-col: Chart + Format breakdown ── */}
      <div className="perf-chart-row" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>

        {/* Daily views chart */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 2 }}>View Growth — Daily</p>
              <p style={{ fontSize: 11, color: '#888' }}>Last 14 days</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#111', lineHeight: 1 }}>{peakDay.views.toLocaleString()}</p>
              <p style={{ fontSize: 10, color: '#888', marginTop: 2 }}>peak · {peakDay.day}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dailyViewHistory} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#F0EDE6" strokeDasharray="0" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false}
                tick={{ fontSize: 9, fill: '#AAA' }} interval={1} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#AAA' }}
                tickFormatter={v => v >= 1000 ? `${v/1000}k` : v} />
              <Tooltip
                contentStyle={{ background: '#111', border: 'none', borderRadius: 8, fontSize: 11, color: '#fff' }}
                itemStyle={{ color: '#A78BFA' }}
                labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}
                formatter={(v) => [v.toLocaleString(), 'views']}
              />
              <Area type="monotone" dataKey="views" stroke="#7C3AED" strokeWidth={2}
                fill="url(#perfGrad)" dot={false} activeDot={{ r: 4, fill: '#7C3AED', stroke: 'white', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Format breakdown */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>Format Breakdown</p>
          <p style={{ fontSize: 11, color: '#888', marginBottom: 16 }}>Average views by content type</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {contentBreakdown
              .sort((a, b) => b.avgViews - a.avgViews)
              .map((row, i) => {
                const maxViews = Math.max(...contentBreakdown.map(r => r.avgViews))
                const barPct = Math.round((row.avgViews / maxViews) * 100)
                return (
                  <div key={row.format} style={{
                    display: 'flex', flexDirection: 'column', gap: 5,
                    padding: '10px 0', borderBottom: i < contentBreakdown.length - 1 ? '1px solid #F0EDE6' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>{row.format}</span>
                        <span style={{ fontSize: 10, color: '#AAA' }}>{row.count} posts</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>{row.avgViews.toLocaleString()}</span>
                        {row.trend === 'up'
                          ? <TrendingUp size={12} color="#059669" />
                          : <Minus size={12} color="#AAA" />}
                      </div>
                    </div>
                    <div style={{ height: 5, background: '#F0EDE6', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{
                        width: `${barPct}%`, height: '100%', borderRadius: 999,
                        background: i === 0 ? 'linear-gradient(90deg,#7C3AED,#A78BFA)' : '#DDD9CF'
                      }} />
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Top performer callout */}
          <div style={{ marginTop: 14, background: '#EDE9FB', borderRadius: 10, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={13} color="#7C3AED" />
            <p style={{ fontSize: 11, color: '#7C3AED', fontWeight: 600, lineHeight: 1.4 }}>
              POV Video is your #1 format — 2.1× your average views
            </p>
          </div>
        </div>
      </div>

      {/* ── Quick stats bar ── */}
      <div className="perf-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { label: 'Avg Views',      value: growth.avgViews.toLocaleString(), note: 'per post' },
          { label: 'Engagement',     value: `${growth.avgEngagementRate}%`,   note: 'above average' },
          { label: 'New Followers',  value: `+${growth.followerChange30d.toLocaleString()}`, note: 'last 30 days' },
          { label: 'Profile Visits', value: growth.profileVisits7d.toLocaleString(), note: 'last 7 days' },
        ].map(stat => (
          <div key={stat.label} style={{ background: '#fff', border: '1px solid #DDD9CF',
            borderRadius: 12, padding: '16px 18px' }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{stat.label}</p>
            <p style={{ fontSize: 26, fontWeight: 800, color: '#111', lineHeight: 1, marginBottom: 3 }}>{stat.value}</p>
            <p style={{ fontSize: 10, color: '#AAA' }}>{stat.note}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
