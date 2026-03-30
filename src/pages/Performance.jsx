import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { TrendingUp, Minus, ArrowUpRight } from 'lucide-react'
import { performanceHistory, contentBreakdown, performanceInsights, growth } from '../data/mockCreator'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import StatBlock from '../components/ui/StatBlock'
import { tooltipStyle } from '../lib/chartStyles'

const impactColors = { 'High': 'danger', 'Medium': 'amber', 'Low': 'muted' }
const typeColors = { 'pattern': 'primary', 'timing': 'amber', 'audience': 'success' }

export default function Performance() {
  return (
    <div className="flex flex-col gap-3.5">
      <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111', letterSpacing: '-0.02em', marginBottom: 2 }}>Performance</h1>

      <div className="grid grid-cols-4 gap-3">
        <StatBlock label="Best Format" value="POV Video" />
        <StatBlock label="Engagement Rate" value={`${growth.avgEngagementRate}%`} change="from 3.8%" trend="up" />
        <StatBlock label="Followers (30d)" value={`+${growth.followerChange30d.toLocaleString()}`} change="growing" trend="up" />
        <StatBlock label="Top Day" value="Monday" />
      </div>

      <Card hover={false}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16 }}>View Growth — Last 7 Weeks</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={performanceHistory}>
            <defs>
              <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#EDE9DB" strokeDasharray="0" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#AAA' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#AAA' }} />
            <Tooltip {...tooltipStyle} />
            <Area type="monotone" dataKey="views" stroke="#7C3AED" strokeWidth={2} fill="url(#purpleGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card hover={false}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16 }}>Format Breakdown</h3>
        <div className="grid grid-cols-[1fr_120px_80px_80px] gap-4 pb-2 border-b border-cream-border">
          {['Format', 'Avg Views', 'Posts', 'Trend'].map(h => (
            <span key={h} style={{ fontSize: 10, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
          ))}
        </div>
        {contentBreakdown.map((row) => (
          <div key={row.format} className="grid grid-cols-[1fr_120px_80px_80px] gap-4 py-3 border-b border-cream-deep last:border-0 hover:bg-cream transition-colors rounded">
            <span style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>{row.format}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{row.avgViews.toLocaleString()}</span>
            <span style={{ fontSize: 13, color: '#666' }}>{row.count}</span>
            <span className="flex items-center">
              {row.trend === 'up' ? <TrendingUp size={14} strokeWidth={2.5} className="text-success" /> : <Minus size={14} className="text-muted" />}
            </span>
          </div>
        ))}
      </Card>

      <div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', letterSpacing: '-0.02em', marginBottom: 12 }}>Insights</h3>
        <div className="grid grid-cols-3 gap-3">
          {performanceInsights.map(ins => (
            <Card key={ins.id}>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={typeColors[ins.type] || 'muted'}>{ins.type}</Badge>
                <Badge variant={impactColors[ins.impact] || 'muted'}>{ins.impact} Impact</Badge>
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 6, lineHeight: 1.4 }}>{ins.headline}</h4>
              <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6, marginBottom: 12 }}>{ins.detail}</p>
              <div className="flex items-center gap-1.5 text-primary">
                <ArrowUpRight size={13} />
                <span style={{ fontSize: 11, fontWeight: 600 }}>{ins.action}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
