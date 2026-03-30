import { Check, AlertCircle, AtSign } from 'lucide-react'
import { creator, profile } from '../data/mockCreator'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'

function MatchCircle({ value }) {
  const r = 54, circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#EDE9DB" strokeWidth="8" />
        <circle cx="64" cy="64" r={r} fill="none" stroke="#7C3AED" strokeWidth="8" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span style={{ fontSize: 28, fontWeight: 800, color: '#111', lineHeight: 1 }}>{value}%</span>
      </div>
    </div>
  )
}

export default function Profile() {
  return (
    <div>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111', letterSpacing: '-0.02em', marginBottom: 14 }}>Profile</h1>
      <div className="grid grid-cols-[340px_1fr] gap-4">
        {/* Left — Identity */}
        <div className="flex flex-col gap-4">
          <Card hover={false}>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-extrabold text-white mb-4"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}>
                {creator.avatarInitials}
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111' }}>{creator.name}</h2>
              <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{creator.handle}</p>
              <Badge variant="primary" className="mt-2">{profile.niche}</Badge>
              <p style={{ fontSize: 12, color: '#666', marginTop: 12, lineHeight: 1.6 }}>{profile.bio}</p>
            </div>
            <div className="mt-5 pt-4 border-t border-cream-deep flex flex-col gap-3">
              {profile.platforms.map(p => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AtSign size={13} className="text-muted" />
                    <span style={{ fontSize: 13, color: '#111' }}>{p.name}</span>
                  </div>
                  <div className="text-right">
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{p.followers.toLocaleString()}</span>
                    <p style={{ fontSize: 11, color: '#888' }}>{p.handle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-cream-deep flex flex-wrap gap-2">
              {profile.contentStyles.map(s => <Badge key={s} variant="muted">{s}</Badge>)}
            </div>
          </Card>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          <Card hover={false}>
            <div className="flex items-center gap-8">
              <MatchCircle value={profile.matchReadiness} />
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 6 }}>CORE-M Match Score</h3>
                <Badge variant="primary" className="mb-3">{profile.matchReadinessLabel}</Badge>
                <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>Increases as you grow and post consistently.</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card hover={false}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 14 }}>Strengths</h4>
              <div className="flex flex-col gap-3">
                {profile.strengths.map(s => (
                  <div key={s} className="flex items-start gap-2">
                    <Check size={13} className="text-success mt-0.5 flex-shrink-0" />
                    <span style={{ fontSize: 12, color: '#666' }}>{s}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card hover={false}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 14 }}>Areas to Improve</h4>
              <div className="flex flex-col gap-3">
                {profile.areasToImprove.map(a => (
                  <div key={a} className="flex items-start gap-2">
                    <AlertCircle size={13} className="text-warning mt-0.5 flex-shrink-0" />
                    <span style={{ fontSize: 12, color: '#666' }}>{a}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card hover={false}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 14 }}>Audience</h4>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 14 }}>{profile.audienceDemographic}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p style={{ fontSize: 10, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Avg Engagement</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#111', lineHeight: 1 }}>{profile.avgEngagementRate}%</p>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Avg Views</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#111', lineHeight: 1 }}>{profile.avgViews.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center justify-between mb-3">
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Athora Intelligence Score</h4>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#111', lineHeight: 1 }}>
                {profile.athoraScore}<span style={{ fontSize: 12, color: '#888', fontWeight: 400 }}>/100</span>
              </span>
            </div>
            <ProgressBar value={profile.athoraScore} max={100} color="#7C3AED" height={6} />
          </Card>
        </div>
      </div>
    </div>
  )
}
