import { growthPlan } from '../data/mockCreator'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'

const priorityColor = { high: '#7C3AED', medium: '#059669', low: '#F59E0B', none: '#DDD9CF' }

export default function GrowthPlan() {
  return (
    <div>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111', letterSpacing: '-0.02em', marginBottom: 14 }}>Growth Plan</h1>
      <div className="grid grid-cols-[1fr_340px] gap-4">
        <div className="flex flex-col gap-4">
          <Card hover={false}>
            <Badge variant="primary" className="mb-3">{growthPlan.currentPhase}</Badge>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 14 }}>{growthPlan.phaseDescription}</p>
            <div className="flex items-center gap-2 pt-3 border-t border-cream-deep">
              <span style={{ fontSize: 10, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Weekly target:</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{growthPlan.weeklyTarget}</span>
            </div>
          </Card>

          <Card hover={false}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 14 }}>Content Mix</h3>
            <div className="flex rounded-lg overflow-hidden h-8 mb-4">
              {growthPlan.contentMix.map(seg => (
                <div key={seg.type} className="flex items-center justify-center text-[10px] font-bold text-white/90" style={{ width: `${seg.percentage}%`, backgroundColor: seg.type === 'POV Hooks' ? '#7C3AED' : seg.type === 'Educational Carousels' ? '#A78BFA' : seg.type === 'Transformation/Progress' ? '#F59E0B' : '#DDD9CF' }}>
                  {seg.percentage}%
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {growthPlan.contentMix.map((seg, i) => {
                const colors = ['#7C3AED', '#A78BFA', '#F59E0B', '#DDD9CF']
                return (
                  <div key={seg.type} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: colors[i] }} />
                    <span style={{ fontSize: 11, color: '#666' }}>{seg.type}</span>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card hover={false}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 24 }}>Milestones</h3>
            <div className="relative flex items-center justify-between mb-6">
              <div className="absolute top-3 left-0 right-0 h-[2px]" style={{ background: '#EDE9DB' }} />
              <div className="absolute top-3 left-0 h-[2px]" style={{ width: `${((growthPlan.milestones.filter(m => m.reached).length - 0.5) / (growthPlan.milestones.length - 1)) * 100}%`, background: '#7C3AED' }} />
              {growthPlan.milestones.map((m, i) => {
                const isNext = !m.reached && (i === 0 || growthPlan.milestones[i - 1].reached)
                return (
                  <div key={m.label} className="relative flex flex-col items-center z-10">
                    <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                      style={{ background: m.reached ? '#7C3AED' : 'white', borderColor: m.reached || isNext ? '#7C3AED' : '#DDD9CF' }}>
                      {m.reached && <div className="w-2 h-2 rounded-full bg-white" />}
                      {isNext && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#7C3AED' }} />}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#111', marginTop: 10 }}>{m.value}</span>
                    <span style={{ fontSize: 10, color: '#888', marginTop: 2, textAlign: 'center', maxWidth: 70 }}>{m.label}</span>
                  </div>
                )
              })}
            </div>
            <ProgressBar value={growthPlan.currentFollowers} max={growthPlan.nextMilestone} color="#7C3AED" height={6} showLabel />
            <p style={{ fontSize: 11, color: '#666', marginTop: 8 }}>
              {(growthPlan.nextMilestone - growthPlan.currentFollowers).toLocaleString()} followers to{' '}
              <span style={{ color: '#7C3AED', fontWeight: 600 }}>{growthPlan.nextMilestoneLabel}</span>
            </p>
          </Card>
        </div>

        <div>
          <Card hover={false} className="sticky top-[70px]">
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 14 }}>Weekly Schedule</h3>
            <div className="flex flex-col">
              {growthPlan.weeklySchedule.map(day => (
                <div key={day.day} className="flex items-center gap-3 py-3 border-b border-cream-deep last:border-0" style={{ opacity: day.priority === 'none' ? 0.4 : 1 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#888', width: 40, textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>{day.day.slice(0, 3)}</span>
                  <span style={{ flex: 1, fontSize: 12, color: day.priority === 'none' ? '#AAA' : '#111', fontStyle: day.priority === 'none' ? 'italic' : 'normal' }}>{day.content}</span>
                  {day.priority !== 'none' && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: priorityColor[day.priority] }} />}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4">
              {[{ color: '#7C3AED', label: 'High' }, { color: '#059669', label: 'Medium' }, { color: '#F59E0B', label: 'Low' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span style={{ fontSize: 10, color: '#888' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
