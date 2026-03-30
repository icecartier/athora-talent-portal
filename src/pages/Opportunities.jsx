import { Lock, Briefcase } from 'lucide-react'
import { opportunities } from '../data/mockCreator'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'

export default function Opportunities() {
  return (
    <div>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111', letterSpacing: '-0.02em', marginBottom: 20 }}>Opportunities</h1>
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6 pt-4">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
          <Lock size={28} className="text-primary" />
        </div>

        <div className="text-center">
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: 8 }}>
            Brand Opportunities Unlock at 15k
          </h2>
          <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, maxWidth: 380 }}>{opportunities.message}</p>
        </div>

        <div className="w-full max-w-sm">
          <ProgressBar value={opportunities.currentFollowers} max={opportunities.unlockAt} color="#7C3AED" height={8} showLabel />
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#7C3AED', marginTop: 8 }}>{opportunities.progressPercent}% there</p>
        </div>

        <p style={{ fontSize: 11, color: '#AAA', textAlign: 'center', maxWidth: 320 }}>{opportunities.subMessage}</p>

        <div className="w-full flex flex-col gap-3 mt-2">
          {opportunities.previewOpportunities.map(opp => (
            <div key={opp.id} className="relative">
              <Card hover={false} className="select-none" style={{ filter: 'blur(5px)', opacity: 0.4, pointerEvents: 'none' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={13} className="text-primary" />
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{opp.brand}</span>
                      <Badge variant="muted">{opp.category}</Badge>
                    </div>
                    <p style={{ fontSize: 12, color: '#666', marginBottom: 3 }}>{opp.type}</p>
                    <p style={{ fontSize: 11, color: '#AAA' }}>{opp.requirements}</p>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#059669' }}>{opp.payout}</span>
                </div>
              </Card>
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge variant="primary"><Lock size={9} className="mr-0.5" />Unlocks at 15k followers</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
