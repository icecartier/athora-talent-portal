import { Check, AlertCircle, AtSign, Users, Eye, Zap, TrendingUp } from 'lucide-react'
import { creator, profile, growth } from '../data/mockCreator'

function MatchArc({ value }) {
  const r = 52, circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="#A78BFA" strokeWidth="10"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 34, fontWeight: 900, color: 'white', lineHeight: 1 }}>{value}%</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>MATCH</span>
      </div>
    </div>
  )
}

function SubScore({ label, value, max, color }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>{value}<span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>/{max}</span></span>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 999 }} />
      </div>
    </div>
  )
}

export default function Profile() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ── MATCH Score hero ── */}
      <div style={{ background: '#111111', borderRadius: 16, padding: '28px 32px',
        border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7C3AED', display: 'inline-block',
            animation: 'core-pulse 2s ease-in-out infinite', flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            MATCH Readiness
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 4 }}>Brand deal compatibility score</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <MatchArc value={profile.matchReadiness} />

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 6 }}>
              You're <span style={{ color: '#A78BFA' }}>Rising</span> — 38 points from Brand Ready
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 20 }}>
              MATCH compares your profile against what brands in your niche actively pay for. At 100%, you start receiving inbound deal offers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
              <SubScore label="Follower count"     value={25} max={40} color="#A78BFA" />
              <SubScore label="Engagement rate"    value={22} max={25} color="#6EE7B7" />
              <SubScore label="Content consistency" value={15} max={20} color="#FCD34D" />
              <SubScore label="Niche alignment"    value={15} max={15} color="#6EE7B7" />
            </div>
          </div>

          {/* What unlocks next */}
          <div style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 14, padding: '20px 22px', minWidth: 200 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Unlocks next</p>
            {[
              { action: 'Reach 15k followers', points: '+15 pts' },
              { action: 'Post 4× / week consistently', points: '+5 pts' },
              { action: 'Keep engagement above 4%', points: 'maintained' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', flex: 1 }}>{item.action}</p>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#A78BFA',
                  background: 'rgba(124,58,237,0.25)', padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                  {item.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2-col: Identity + Audience ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 14 }}>

        {/* Creator identity card */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: 24,
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

          <div style={{ width: 72, height: 72, borderRadius: 16, background: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 14 }}>
            {creator.avatarInitials}
          </div>

          <p style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 3 }}>{creator.name}</p>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>{creator.handle}</p>

          <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', background: '#EDE9FB',
            padding: '3px 10px', borderRadius: 999, marginBottom: 14 }}>{creator.tier} · Level {creator.tierLevel}</span>

          <p style={{ fontSize: 12, color: '#666', lineHeight: 1.7, marginBottom: 16 }}>{profile.bio}</p>

          <div style={{ width: '100%', borderTop: '1px solid #F0EDE6', paddingTop: 16, marginBottom: 16 }}>
            {profile.platforms.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AtSign size={12} color="#AAA" />
                  <span style={{ fontSize: 13, color: '#111' }}>{p.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: '#111', lineHeight: 1 }}>{p.followers.toLocaleString()}</p>
                  <p style={{ fontSize: 10, color: '#AAA' }}>{p.handle}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
            {profile.contentStyles.map(s => (
              <span key={s} style={{ fontSize: 10, fontWeight: 600, color: '#555',
                background: '#F5F3FF', padding: '3px 10px', borderRadius: 999 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Audience + brand value */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Audience — brand value framing */}
          <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Your Audience</p>
              <p style={{ fontSize: 11, color: '#888' }}>What brands are actually paying for</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
              {[
                { icon: Users, label: 'Audience',    value: '12.4k', note: 'Instagram followers', color: '#7C3AED' },
                { icon: Eye,   label: 'Avg Reach',   value: '8,200',  note: 'views per post',      color: '#059669' },
                { icon: Zap,   label: 'Engagement',  value: '4.7%',   note: 'above 3% avg',        color: '#F59E0B' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#FAFAF8', border: '1px solid #EDE9E2',
                  borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <stat.icon size={12} color={stat.color} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{stat.label}</span>
                  </div>
                  <p style={{ fontSize: 22, fontWeight: 800, color: '#111', lineHeight: 1, marginBottom: 3 }}>{stat.value}</p>
                  <p style={{ fontSize: 10, color: '#AAA' }}>{stat.note}</p>
                </div>
              ))}
            </div>

            {/* Demographic breakdown */}
            <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 10, padding: '12px 16px' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase',
                letterSpacing: '0.1em', marginBottom: 6 }}>Brand-value demographic</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 4 }}>{profile.audienceDemographic}</p>
              <p style={{ fontSize: 11, color: '#7C3AED' }}>
                18–34 US males are the highest-value segment for fitness, supplements, and apparel brands
              </p>
            </div>
          </div>

          {/* Strengths + Areas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: '18px 20px' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 14 }}>Strengths</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile.strengths.map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#D1FAE5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Check size={10} color="#059669" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 12, color: '#333', lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: '18px 20px' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 14 }}>To Improve</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile.areasToImprove.map(a => (
                  <div key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#FEF3C7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <AlertCircle size={10} color="#D97706" />
                    </div>
                    <span style={{ fontSize: 12, color: '#333', lineHeight: 1.5 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Athora score */}
          <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 14, padding: '18px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 2 }}>Athora Intelligence Score</p>
                <p style={{ fontSize: 11, color: '#888' }}>Composite growth, engagement, and consistency rating</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: '#111', lineHeight: 1 }}>{profile.athoraScore}</span>
                <span style={{ fontSize: 14, color: '#AAA', fontWeight: 400 }}>/100</span>
              </div>
            </div>
            <div style={{ height: 8, background: '#F0EDE6', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${profile.athoraScore}%`, height: '100%', borderRadius: 999,
                background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 10, color: '#CCC' }}>0</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#7C3AED' }}>
                {profile.athoraScore} — Rising tier
              </span>
              <span style={{ fontSize: 10, color: '#CCC' }}>100</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
